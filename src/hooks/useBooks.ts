import { useQuery } from "react-query"
import Book from "../models/book"
import { sort } from "fast-sort"

export const failedToFetchBooksMessage = "Failed to fetch books!"

export default function useBooks() {
  return useQuery<Book[], Error>(["books"], fetchBooks)
}

const fetchBooks = async () => {
  const response = await fetch(
    "https://us-central1-all-turtles-interview.cloudfunctions.net/books",
    {
      headers: {
        Authorization: "Basic benjaminjames",
      },
      method: "GET",
    }
  )
  if (!response.ok) throw new Error(failedToFetchBooksMessage)
  const json: Book[] = await response.json()
  return sort(json).asc(book => book.title)
}
