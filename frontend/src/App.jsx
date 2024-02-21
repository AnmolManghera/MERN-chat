import { Register } from "./components/Register"
import {Login} from "./components/Login";
import Home from "./components/Home";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from "./components/Chat";
function App() {
  let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route 
          path = "/" 
          element={user ? <Home/> : <Login/>}
        />
        <Route 
          path = "/register" 
          element={user ? <Home/> : <Register/>}
        />
        <Route 
          path = "/login" 
          element={user ? <Home/> : <Login/>}
        />
        <Route 
          path = "/chats" 
          element={user ? <Chat/> : <Login/>}
        />
      </Routes>
    </BrowserRouter>
    
    
    
  )
}

export default App
