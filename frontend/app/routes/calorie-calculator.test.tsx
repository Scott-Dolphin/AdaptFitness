import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CalorieCalculator from './calorie-calculator'

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
            lte: () => ({
              order: () => Promise.resolve({ data: [], error: null })
            }),
            order: () => ({
              limit: () => ({
                maybeSingle: () => Promise.resolve({ data: null, error: null })
              })
            })
          }),
          order: () => ({
            limit: () => ({
              maybeSingle: () => Promise.resolve({ data: null, error: null })
            })
          })
        })
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      })
    }),
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      }))
    }
  }
}))

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id', email: 'test@test.com' },
    logout: vi.fn()
  })
}))

describe('CalorieCalculator', () => {
  const renderCalculator = () => {
    render(
      <MemoryRouter>
        <CalorieCalculator />
      </MemoryRouter>
    )
  }

  it('renders without crashing', async () => {
    renderCalculator()
    await waitFor(() => {
      expect(document.body).toBeTruthy()
    })
  })

  it('displays the your information form', async () => {
    renderCalculator()
    await waitFor(() => {
      expect(screen.getAllByText(/your information/i).length).toBeGreaterThan(0)
    })
  })

  it('displays age input field', async () => {
    renderCalculator()
    await waitFor(() => {
      expect(screen.getAllByText(/age/i).length).toBeGreaterThan(0)
    })
  })

  it('displays sex selection', async () => {
    renderCalculator()
    await waitFor(() => {
      expect(screen.getAllByText(/male/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/female/i).length).toBeGreaterThan(0)
    })
  })

  it('displays activity level options', async () => {
    renderCalculator()
    await waitFor(() => {
      expect(screen.getAllByText(/activity level/i).length).toBeGreaterThan(0)
    })
  })

  it('displays goal selection', async () => {
    renderCalculator()
    await waitFor(() => {
      expect(screen.getAllByText(/goal/i).length).toBeGreaterThan(0)
    })
  })

  it('displays your results section', async () => {
    renderCalculator()
    await waitFor(() => {
      expect(screen.getAllByText(/your results/i).length).toBeGreaterThan(0)
    })
  })

  it('displays calculate button', async () => {
    renderCalculator()
    await waitFor(() => {
      expect(screen.getAllByText(/calculate/i).length).toBeGreaterThan(0)
    })
  })
})