import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import App from "./App"
import { BrowserRouter, MemoryRouter } from "react-router-dom"
import useBooks from "./hooks/useBooks"

const mockedUseBooks = useBooks as jest.Mock<any>
jest.mock("./hooks/useBooks")

describe("App", () => {
  beforeEach(() => {
    mockedUseBooks.mockImplementation(() => ({ isLoading: true }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Renders correctly", async () => {
    render(<App />, { wrapper: BrowserRouter })

    const heading = await screen.findByRole("heading", { level: 1 })
    expect(heading).toHaveTextContent("Bookshelf")
  })

  test("Clicking the Add book button opens the Add book form", async () => {
    render(<App />, { wrapper: BrowserRouter })
    const user = userEvent.setup()

    const addBookButton = await screen.findByRole("button", {
      name: "Add book",
    })
    await user.click(addBookButton)

    const heading = await screen.findByRole("heading", { level: 1 })
    expect(heading).toHaveTextContent("Add a new book")
  })

  test("Clicking the X button on the form closes the Add book form", async () => {
    render(
      <MemoryRouter initialEntries={["/add"]}>
        <App />
      </MemoryRouter>
    )
    const user = userEvent.setup()

    const closeButton = await screen.findByRole("button", { name: "close" })
    await user.click(closeButton)

    const heading = await screen.findByRole("heading", { level: 1 })
    expect(heading).toHaveTextContent("Bookshelf")
  })
})
