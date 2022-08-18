import { useMutation } from "react-query"
import { queryClient } from "../App"
import Book from "../models/book"

export default function useDeleteBook() {
  const mutation = useMutation(deleteBook, {
    onMutate: async (book: Book) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["books"])

      // Snapshot the previous value
      const previousBooks = queryClient.getQueryData<Book[]>(["books"])

      // Optimistically update to the new value
      queryClient.setQueryData(["books"], (prev?: Book[]) =>
        prev ? prev.filter(it => it.id !== book.id) : []
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
  return mutation.mutate
}

const deleteBook = async (book: Book) => {
  const response = await fetch(
    `https://us-central1-all-turtles-interview.cloudfunctions.net/books/${book.id}`,
    {
      headers: {
        Authorization: "Basic benjaminjames",
      },
      method: "DELETE",
    }
  )
  if (!response.ok) throw new Error("Failed to delete book!")
  return await response.json()
}
