import { BrowserRouter } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import RoutesApp from "./routes"

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} position="bottom-right"/>
      <RoutesApp/>
    </BrowserRouter>
  )
}