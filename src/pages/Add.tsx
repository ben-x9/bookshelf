import "./Add.css"

export default function Add() {
  return (
    <div className="Add">
      <header>
        <h1>Add a new book</h1>
        <img src="cross.svg" />
      </header>
      <main>
        <label>
          Title
          <input />
        </label>
        <label>
          Author
          <input />
        </label>
        <label>
          Description
          <textarea />
        </label>
        <label>
          Image URL
          <input />
        </label>
        <button onClick={() => {}}>Save</button>
      </main>
    </div>
  )
}
