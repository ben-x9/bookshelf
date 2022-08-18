import "./App.css"
import Book from "./models/book"

const book: Book = {
  id: "1",
  title: "The Lord of the Rings",
  author: "J.R.R. Tolkien",
  description:
    "The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien's extensive knowledge of philology and folklore.",
  imageUrl: "https://picsum.photos/125/200",
}

const books = [book, book, book, book]

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Bookshelf</h1>
        <button>Add book</button>
      </header>
      <main>
        {books.map((book, i) => (
          <BookCard key={i} {...book} />
        ))}
      </main>
    </div>
  )
}

const BookCard = (book: Book) => (
  <div className="book-card">
    <img className="cover" src={book.imageUrl} alt="Book cover" />
    <div className="info">
      <h3>{book.title}</h3>
      <h4>{book.author}</h4>
      <p>{book.description}</p>
    </div>
    <img className="trash-can" src="trash-can.svg" alt="Trash can"></img>
  </div>
)
