import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NutritionLog from './Nutrition-log'

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

describe('NutritionLog', () => {
  const renderNutritionLog = () => {
    render(
      <MemoryRouter>
        <NutritionLog />
      </MemoryRouter>
    )
  }

  it('renders without crashing', async () => {
    renderNutritionLog()
    await waitFor(() => {
      expect(document.body).toBeTruthy()
    })
  })

  it('displays the nutrition log header', async () => {
    renderNutritionLog()
    await waitFor(() => {
      expect(screen.getAllByText(/nutrition log/i).length).toBeGreaterThan(0)
    })
  })

  it('displays todays summary card', async () => {
    renderNutritionLog()
    await waitFor(() => {
      expect(screen.getAllByText(/today's summary/i).length).toBeGreaterThan(0)
    })
  })

  it('displays add meal button', async () => {
    renderNutritionLog()
    await waitFor(() => {
      expect(screen.getAllByText(/add meal/i).length).toBeGreaterThan(0)
    })
  })

  it('displays macronutrients section', async () => {
    renderNutritionLog()
    await waitFor(() => {
      expect(screen.getAllByText(/macronutrients/i).length).toBeGreaterThan(0)
    })
  })
})