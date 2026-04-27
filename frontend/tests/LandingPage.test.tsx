import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LandingPage from '../app/routes/LandingPage';

// React-router 
vi.mock('react-router', () => ({
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}));

describe('LandingPage Test', () => {
    it('loads without crashing', () => {
        const { container } = render(<LandingPage />);
        expect(container).toBeTruthy();
    });
});
