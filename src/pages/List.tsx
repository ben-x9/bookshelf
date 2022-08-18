import "./List.css"
import trashCan from "../assets/trash-can.svg"
import Book from "../models/book"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import useBooks from "../hooks/useBooks"

export default function List() {
  const navigate = useNavigate()
  const { isLoading, error, data: books } = useBooks()
  return (
    <div className="List">
      <header>
        <h1>Bookshelf</h1>
        <button onClick={() => navigate("/add")}>Add book</button>
      </header>
      <main>
        <ul>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <div className="error-message">{error.message}</div>
          ) : (
            books?.map((book, i) => <BookCard key={i} {...book} />)
          )}
        </ul>
      </main>
    </div>
  )
}

const BookCard = (book: Book) => (
  <li className="book-card">
    <img className="cover" src={book.imageUrl} alt="Book cover" />
    <div className="info">
      <h3>{book.title}</h3>
      <h4>{book.author}</h4>
      <p>{book.description}</p>
    </div>
    <img className="trash-can" src={trashCan} alt="Trash can"></img>
  </li>
)
