import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import SignupPage from '../app/routes/SignupPage';
import { AuthProvider } from '../app/context/AuthContext';

vi.mock('../app/lib/supabase', () => ({
    supabase: {
        auth: {
            signUp: vi.fn(() => Promise.resolve({ data: { user: null, session: null }, error: null })),
            getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
            onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } }))
        }
    }
}));

describe('SignupPage Test', () => {
    it('loads without crashing', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SignupPage />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/create an account/i)).toBeInTheDocument();
        });
    });

    it('displays signup form', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SignupPage />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/enter your information/i)).toBeInTheDocument();
        });
    });

    it('displays create account button', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <SignupPage />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
        });
    });
});
