import { useQuery } from "react-query"
import Book from "../models/book"

export const failedToFetchBooks = "Failed to fetch books!"

export default function useBooks() {
  return useQuery<Book[], Error>("books", async () => {
    const response = await fetch("https://libraryasdfasdfasdfasdf.com/books")
    if (!response.ok) throw new Error(failedToFetchBooks)
    return await response.json()
  })
}
