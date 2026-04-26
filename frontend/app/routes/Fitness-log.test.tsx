import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import FitnessLog from './Fitness-log'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => vi.fn() }
})

const renderFitnessLog = () =>
  render(<MemoryRouter><FitnessLog /></MemoryRouter>)

describe('FitnessLog', () => {
  it('renders without crashing', () => {
    renderFitnessLog()
    expect(document.body).toBeTruthy()
  })

  it('displays the Fitness Log heading', () => {
    renderFitnessLog()
    expect(screen.getByText(/fitness log/i)).toBeTruthy()
  })

  it('displays the daily summary card', () => {
    renderFitnessLog()
    expect(screen.getByText(/today's summary/i)).toBeTruthy()
  })

  it('displays default mock exercises on load', () => {
    renderFitnessLog()
    expect(screen.getByText(/bench press/i)).toBeTruthy()
    expect(screen.getByText(/running/i)).toBeTruthy()
    expect(screen.getByText(/squats/i)).toBeTruthy()
  })

  it('displays workout breakdown stats', () => {
    renderFitnessLog()
    expect(screen.getByText(/strength training/i)).toBeTruthy()
    expect(screen.getAllByText(/cardio/i).length).toBeGreaterThan(0)
  })

  it('shows add exercise form when Add Exercise button is clicked', () => {
    renderFitnessLog()
    fireEvent.click(screen.getByText(/add exercise/i))
    expect(screen.getByText(/add new exercise/i)).toBeTruthy()
  })

  it('filters exercises when searching', () => {
    renderFitnessLog()
    const searchInput = screen.getByPlaceholderText(/search exercises/i)
    fireEvent.change(searchInput, { target: { value: 'bench' } })
    expect(screen.getByText(/bench press/i)).toBeTruthy()
    expect(screen.queryByText(/running/i)).toBeNull()
  })

  it('removes an exercise when delete button is clicked', () => {
    renderFitnessLog()
    expect(screen.getByText(/squats/i)).toBeTruthy()
    const deleteButtons = screen.getAllByRole('button', { name: '' })
    fireEvent.click(deleteButtons[deleteButtons.length - 1])
    expect(screen.queryByText(/squats/i)).toBeNull()
  })
})
