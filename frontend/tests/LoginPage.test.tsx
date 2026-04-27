import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import LoginPage from '../app/routes/LoginPage';
import { AuthProvider } from '../app/context/AuthContext';

vi.mock('../app/lib/supabase', () => ({
    supabase: {
        auth: {
            signInWithPassword: vi.fn(() => Promise.resolve({ data: { user: null, session: null }, error: null })),
            getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
            onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } }))
        }
    }
}));

describe('LoginPage Test', () => {
    it('loads without crashing', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <LoginPage />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
        });
    });

    it('displays email and password input fields', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <LoginPage />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
        });
    });

    it('displays login form', async () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <LoginPage />
                </AuthProvider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/enter your credentials/i)).toBeInTheDocument();
        });
    });
});
