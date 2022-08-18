import { getByText, queryByText, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import List from "./List"
import useBooks, { failedToFetchBooks } from "../hooks/useBooks"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"
import { book, books } from "../fixtures/book"

const queryClient = new QueryClient()
const wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </BrowserRouter>
)

const mockedUseBooks = useBooks as jest.Mock<any>
jest.mock("../hooks/useBooks")

describe("List", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Renders correctly", async () => {
    mockedUseBooks.mockImplementation(() => ({ isLoading: true }))
    render(<List />, { wrapper })

    const heading = await screen.findByRole("heading", { level: 1 })
    expect(heading).toHaveTextContent("Bookshelf")
  })

  test("Shows a spinner while loading", async () => {
    mockedUseBooks.mockImplementation(() => ({ isLoading: true }))
    const { container } = render(<List />, { wrapper })

    expect(container.querySelector(".spinner")).toBeInTheDocument()
  })

  test("Shows a message on error loading", async () => {
    mockedUseBooks.mockImplementation(() => ({
      error: new Error(failedToFetchBooks),
    }))
    render(<List />, { wrapper })

    expect(await screen.getByText(failedToFetchBooks)).toBeInTheDocument()
  })

  test("Displays loaded books", async () => {
    mockedUseBooks.mockImplementation(() => ({
      data: books,
    }))
    render(<List />, { wrapper })

    const bookCards = await screen.getAllByRole("listitem")
    expect(bookCards).toHaveLength(4)
  })
})
