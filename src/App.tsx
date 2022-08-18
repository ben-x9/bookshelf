import "./App.css"
import List from "./pages/List"
import Add from "./pages/Add"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/add" element={<Add />} />
    </Routes>
  )
}
