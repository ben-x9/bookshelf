import { render as _render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import React from "react"
import App from "./App"

function render(tsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ..._render(tsx),
  }
}

describe("App", () => {
  test("Renders correctly", async () => {
    render(<App />)

    // Has a heading
    const heading = await screen.findByRole("heading")
    expect(heading).toHaveTextContent("Vite + React")

    // Has a button
    const button = await screen.findByRole("button")
    expect(button).toHaveTextContent("count is 0")
  })

  test("Clicking the button increments the count", async () => {
    render(<App />)

    // Has a button
    const button = await screen.findByRole("button")
    expect(button).toHaveTextContent("count is 0")

    // Click the button
    await userEvent.click(button)
    expect(button).toHaveTextContent("count is 1")
  })
})
