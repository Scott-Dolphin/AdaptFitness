import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Dashboard from './dashboard'

// Mock useNavigate to avoid router context issues
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return { ...actual, useNavigate: () => vi.fn() }
})

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '123', email: 'test@example.com' },
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    session: null,
  }),
  AuthProvider: ({ children }: any) => <>{children}</>,
}))

vi.mock('recharts', () => ({
  AreaChart: ({ children }: any) => <div>{children}</div>,
  BarChart: ({ children }: any) => <div>{children}</div>,
  PieChart: ({ children }: any) => <div>{children}</div>,
  Area: () => null, Bar: () => null, Pie: () => null, Cell: () => null,
  XAxis: () => null, YAxis: () => null, CartesianGrid: () => null,
  Tooltip: () => null, Legend: () => null,
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
}))

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signOut: vi.fn().mockResolvedValue({}),
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
    },
  },
}))

const renderDashboard = () =>
  render(<MemoryRouter><Dashboard /></MemoryRouter>)


describe('Dashboard', () => {
  it('renders without crashing', () => {
    renderDashboard()
    expect(document.body).toBeTruthy()
  })

  it('displays the welcome message', () => {
    renderDashboard()
    expect(screen.getByText(/welcome back/i)).toBeTruthy()
  })

  it('displays calorie stats card', () => {
    renderDashboard()
    expect(screen.getByText(/calories today/i)).toBeTruthy()
  })

  it('displays workout stats card', () => {
    renderDashboard()
    expect(screen.getByText(/workouts this week/i)).toBeTruthy()
  })

  it('displays navigation feature cards', () => {
    renderDashboard()
    expect(screen.getAllByText(/calorie calculator/i).length).toBeGreaterThan(0)
  })

  it('displays the recent activity section', () => {
    renderDashboard()
    expect(screen.getByText(/recent activity/i)).toBeTruthy()
  })

  it('displays water intake card', () => {
    renderDashboard()
    expect(screen.getAllByText(/water intake/i).length).toBeGreaterThan(0)
  })

  it('displays todays goals section', () => {
    renderDashboard()
    expect(screen.getAllByText(/today's goals/i).length).toBeGreaterThan(0)
  })

  it('displays current weight card', () => {
    renderDashboard()
    expect(screen.getAllByText(/current weight/i).length).toBeGreaterThan(0)
  })
})
