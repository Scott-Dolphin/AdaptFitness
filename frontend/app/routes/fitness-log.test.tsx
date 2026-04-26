import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FitnessLog from './Fitness-log'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => vi.fn() }
})

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          gte: () => ({
            order: () => Promise.resolve({ data: [], error: null })
          }),
          order: () => ({
            limit: () => ({
              maybeSingle: () => Promise.resolve({ data: null, error: null })
            })
          })
        })
      })
    })
  }
}))

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id', email: 'test@test.com' },
    logout: vi.fn()
  })
}))

describe('FitnessLog', () => {
  const renderFitnessLog = () => {
    render(
      <MemoryRouter>
        <FitnessLog />
      </MemoryRouter>
    )
  }

  it('renders without crashing', async () => {
    renderFitnessLog()
    await waitFor(() => {
      expect(document.body).toBeTruthy()
    })
  })

  it('displays the fitness log header', async () => {
    renderFitnessLog()
    await waitFor(() => {
      expect(screen.getAllByText(/fitness log/i).length).toBeGreaterThan(0)
    })
  })

  it('displays todays summary card', async () => {
    renderFitnessLog()
    await waitFor(() => {
      expect(screen.getAllByText(/today's summary/i).length).toBeGreaterThan(0)
    })
  })

  it('displays add exercise button', async () => {
    renderFitnessLog()
    await waitFor(() => {
      expect(screen.getAllByText(/add exercise/i).length).toBeGreaterThan(0)
    })
  })

  it('displays todays workout section', async () => {
    renderFitnessLog()
    await waitFor(() => {
      expect(screen.getAllByText(/today's workout/i).length).toBeGreaterThan(0)
    })
  })
})