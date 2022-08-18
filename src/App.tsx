import "./App.css"
import List from "./pages/List"
import Add from "./pages/Add"
import { Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

export const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </QueryClientProvider>
  )
}
