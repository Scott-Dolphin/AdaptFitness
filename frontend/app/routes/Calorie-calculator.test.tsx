import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import CalorieCalculator from './calorie-calculator'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => vi.fn() }
})

const renderCalculator = () =>
  render(<MemoryRouter><CalorieCalculator /></MemoryRouter>)

describe('CalorieCalculator', () => {
  it('renders without crashing', () => {
    renderCalculator()
    expect(document.body).toBeTruthy()
  })

  it('displays the Calorie Calculator heading', () => {
    renderCalculator()
    expect(screen.getByText(/calorie calculator/i)).toBeTruthy()
  })

  it('displays the form fields', () => {
    renderCalculator()
    expect(screen.getByLabelText(/age/i)).toBeTruthy()
    expect(screen.getByLabelText(/height/i)).toBeTruthy()
    expect(screen.getByLabelText(/weight/i)).toBeTruthy()
  })

  it('displays sex selection buttons', () => {
    renderCalculator()
    expect(screen.getByText(/^male$/i)).toBeTruthy()
    expect(screen.getByText(/^female$/i)).toBeTruthy()
  })

  it('displays activity level options', () => {
    renderCalculator()
    expect(screen.getByText(/inactive/i)).toBeTruthy()
    expect(screen.getByText(/somewhat active/i)).toBeTruthy()
    expect(screen.getByText(/very active/i)).toBeTruthy()
  })

  it('displays goal options', () => {
    renderCalculator()
    expect(screen.getByText(/lose weight/i)).toBeTruthy()
    expect(screen.getByText(/maintain weight/i)).toBeTruthy()
    expect(screen.getByText(/gain weight/i)).toBeTruthy()
  })

  it('calculate button is disabled when form is empty', () => {
    renderCalculator()
    const button = screen.getByText(/calculate calories/i)
    expect(button.closest('button')).toHaveProperty('disabled', true)
  })


  it('shows results after filling out the form and submitting', () => {
    renderCalculator()
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '25' } })
    fireEvent.change(screen.getByLabelText(/height/i), { target: { value: '175' } })
    fireEvent.change(screen.getByLabelText(/weight/i), { target: { value: '70' } })
    fireEvent.click(screen.getByText(/^male$/i))
    fireEvent.click(screen.getByText(/^inactive$/i))
    fireEvent.click(screen.getByText(/^maintain weight$/i))
    const form = document.querySelector('form')
    fireEvent.submit(form!)
    expect(screen.queryByText(/complete the form to see your personalized calorie recommendations/i)).toBeNull()
  })

})