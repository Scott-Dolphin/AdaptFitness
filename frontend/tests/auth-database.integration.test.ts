import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { createClient } from '@supabase/supabase-js';

/**
 * Integration test for authentication and database synchronization
 * Tests that user profile data is correctly created in the database when a user signs up
 */

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

interface TestUser {
  email: string;
  password: string;
  id?: string;
}

let supabase = createClient(supabaseUrl, supabaseAnonKey);
const testUsers: TestUser[] = [];

describe('Authentication & Database Integration Tests', () => {
  beforeAll(async () => {
    // Verify Supabase credentials are available
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables. Check SUPABASE_URL and SUPABASE_ANON_KEY');
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey);
  });

  afterEach(async () => {
    // Clean up test users after each test
    for (const user of testUsers) {
      if (user.id) {
        try {
          // Delete from profiles table (cascade will handle auth.users)
          await supabase
            .from('profiles')
            .delete()
            .eq('id', user.id);
        } catch (error) {
          console.error(`Failed to clean up user ${user.email}:`, error);
        }
      }
    }
    testUsers.length = 0;
  });

  it('should create a user profile in the database when a new user signs up', async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    const testName = 'Test User';

    // Sign up a new user
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: { name: testName },
      },
    });

    expect(signupError).toBeNull();
    expect(signupData.user).toBeDefined();
    expect(signupData.user?.id).toBeDefined();

    const userId = signupData.user!.id;
    testUsers.push({ email: testEmail, password: testPassword, id: userId });

    // Give the database trigger a moment to execute
    await new Promise(resolve => setTimeout(resolve, 500));

    // Verify the profile was created in the database
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    expect(profileError).toBeNull();
    expect(profileData).toBeDefined();
    expect(profileData?.id).toBe(userId);
    expect(profileData?.email).toBe(testEmail);
    expect(profileData?.name).toBe(testName);
    expect(profileData?.created_at).toBeDefined();
    expect(profileData?.updated_at).toBeDefined();
  });

  it('should retrieve existing user profile data after login', async () => {
    const testEmail = `test-login-${Date.now()}@example.com`;
    const testPassword = 'LoginTest123!';
    const testName = 'Login Test User';

    // Sign up first
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: { name: testName },
      },
    });

    expect(signupError).toBeNull();
    const userId = signupData.user!.id;
    testUsers.push({ email: testEmail, password: testPassword, id: userId });

    // Wait for trigger
    await new Promise(resolve => setTimeout(resolve, 500));

    // Sign in with the same credentials
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });

    expect(loginError).toBeNull();
    expect(loginData.session).toBeDefined();
    expect(loginData.user?.id).toBe(userId);

    // Query the profiles table to verify data persists
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    expect(profileError).toBeNull();
    expect(profileData).toBeDefined();
    expect(profileData?.email).toBe(testEmail);
    expect(profileData?.name).toBe(testName);
  });

  it('should update the updated_at timestamp when profile is modified', async () => {
    const testEmail = `test-update-${Date.now()}@example.com`;
    const testPassword = 'UpdateTest123!';
    const testName = 'Update Test User';

    // Sign up
    const { data: signupData } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: { data: { name: testName } },
    });

    const userId = signupData.user!.id;
    testUsers.push({ email: testEmail, password: testPassword, id: userId });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Get initial profile
    const { data: initialProfile } = await supabase
      .from('profiles')
      .select('updated_at')
      .eq('id', userId)
      .single();

    expect(initialProfile).toBeDefined();
    const initialUpdatedAt = new Date(initialProfile!.updated_at).getTime();

    // Wait a bit and update the profile
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ name: 'Updated Name' })
      .eq('id', userId);

    expect(updateError).toBeNull();

    // Verify updated_at changed
    const { data: updatedProfile } = await supabase
      .from('profiles')
      .select('updated_at, name')
      .eq('id', userId)
      .single();

    expect(updatedProfile).toBeDefined();
    expect(updatedProfile?.name).toBe('Updated Name');
    const updatedTimestamp = new Date(updatedProfile!.updated_at).getTime();
    expect(updatedTimestamp).toBeGreaterThan(initialUpdatedAt);
  });

  it('should handle user signup without explicit name metadata gracefully', async () => {
    const testEmail = `test-noname-${Date.now()}@example.com`;
    const testPassword = 'NoNameTest123!';

    // Sign up without providing a name in metadata
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    expect(signupError).toBeNull();
    const userId = signupData.user!.id;
    testUsers.push({ email: testEmail, password: testPassword, id: userId });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Verify profile was created with default name (email prefix)
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    expect(profileError).toBeNull();
    expect(profileData).toBeDefined();
    expect(profileData?.email).toBe(testEmail);
    // Should default to email prefix
    expect(profileData?.name).toBe(testEmail.split('@')[0]);
  });

  it('should allow multiple users to have independent profiles', async () => {
    const testEmail1 = `test-independent-1-${Date.now()}@example.com`;
    const testPassword1 = 'Independent123!';
    const testName1 = 'Independent User 1';

    // Create and verify first user profile
    const { data: user1Data, error: user1Error } = await supabase.auth.signUp({
      email: testEmail1,
      password: testPassword1,
      options: { data: { name: testName1 } },
    });

    expect(user1Error).toBeNull();
    const user1Id = user1Data.user!.id;
    testUsers.push({ email: testEmail1, password: testPassword1, id: user1Id });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Verify first user's profile was created
    const { data: profile1, error: profile1Error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user1Id)
      .single();

    expect(profile1Error).toBeNull();
    expect(profile1?.email).toBe(testEmail1);
    expect(profile1?.name).toBe(testName1);

    // Create and verify second user profile
    const testEmail2 = `test-independent-2-${Date.now() + 100}@example.com`;
    const testPassword2 = 'Independent456!';
    const testName2 = 'Independent User 2';

    const { data: user2Data, error: user2Error } = await supabase.auth.signUp({
      email: testEmail2,
      password: testPassword2,
      options: { data: { name: testName2 } },
    });

    expect(user2Error).toBeNull();
    const user2Id = user2Data.user!.id;
    testUsers.push({ email: testEmail2, password: testPassword2, id: user2Id });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Verify second user can sign in and retrieve their profile
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testEmail2,
      password: testPassword2,
    });

    expect(loginError).toBeNull();
    expect(loginData.user?.id).toBe(user2Id);

    // Query second user's profile
    const { data: profile2, error: profile2Error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user2Id)
      .single();

    expect(profile2Error).toBeNull();
    expect(profile2?.email).toBe(testEmail2);
    expect(profile2?.name).toBe(testName2);

    // Verify the two users have different IDs and data
    expect(user1Id).not.toBe(user2Id);
  });
});
