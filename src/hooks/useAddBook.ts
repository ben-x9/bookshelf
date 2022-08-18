import { sort } from "fast-sort"
import { useMutation } from "react-query"
import { queryClient } from "../App"
import Book from "../models/book"

export default function useAddBook() {
  const mutation = useMutation(postBook, {
    onMutate: async (newBook: Book) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["books"])

      // Snapshot the previous value
      const previousBooks = queryClient.getQueryData<Book[]>(["books"])

      // Optimistically update to the new value
      queryClient.setQueryData(["books"], (prev?: Book[]) =>
        prev ? sort([...prev, newBook]).asc(book => book.title) : [newBook]
      )

      // Return a context object with the snapshotted value
      return { previousBooks }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newBook, context) => {
      queryClient.setQueryData("books", context?.previousBooks)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("books")
    },
  })
  return (book: Omit<Book, "id">) => {
    mutation.mutate({ ...book, id: crypto.randomUUID() })
  }
}

const postBook = async (book: Book) => {
  const { id, ...body } = book
  const response = await fetch(
    "https://us-central1-all-turtles-interview.cloudfunctions.net/books",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic benjaminjames",
      },
      method: "POST",
      body: JSON.stringify(body),
    }
  )
  if (!response.ok) throw new Error("Failed to post new book!")
  return await response.json()
}
