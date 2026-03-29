import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import NutritionLog from './Nutrition-log'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => vi.fn() }
})

const renderNutritionLog = () =>
  render(<MemoryRouter><NutritionLog /></MemoryRouter>)

describe('NutritionLog', () => {
  it('renders without crashing', () => {
    renderNutritionLog()
    expect(document.body).toBeTruthy()
  })

  it('displays the Nutrition Log heading', () => {
    renderNutritionLog()
    expect(screen.getByText(/nutrition log/i)).toBeTruthy()
  })

  it('displays the daily summary card', () => {
    renderNutritionLog()
    expect(screen.getByText(/today's summary/i)).toBeTruthy()
  })

  it('displays default mock meals on load', () => {
    renderNutritionLog()
    expect(screen.getByText(/oatmeal with berries/i)).toBeTruthy()
    expect(screen.getByText(/grilled chicken salad/i)).toBeTruthy()
    expect(screen.getByText(/greek yogurt/i)).toBeTruthy()
  })

  it('displays macronutrient totals', () => {
    renderNutritionLog()
    expect(screen.getByText(/protein/i)).toBeTruthy()
    expect(screen.getByText(/carbs/i)).toBeTruthy()
    expect(screen.getByText(/fat/i)).toBeTruthy()
  })

  it('shows add meal form when Add Meal button is clicked', () => {
    renderNutritionLog()
    fireEvent.click(screen.getByText(/add meal/i))
    expect(screen.getByText(/add new meal/i)).toBeTruthy()
  })

  it('filters meals when searching', () => {
    renderNutritionLog()
    const searchInput = screen.getByPlaceholderText(/search meals/i)
    fireEvent.change(searchInput, { target: { value: 'oatmeal' } })
    expect(screen.getByText(/oatmeal with berries/i)).toBeTruthy()
    expect(screen.queryByText(/grilled chicken salad/i)).toBeNull()
  })

  it('removes a meal when delete button is clicked', () => {
    renderNutritionLog()
    expect(screen.getByText(/greek yogurt/i)).toBeTruthy()
    const deleteButtons = screen.getAllByRole('button', { name: '' })
    fireEvent.click(deleteButtons[deleteButtons.length - 1])
    expect(screen.queryByText(/greek yogurt/i)).toBeNull()
  })
})
