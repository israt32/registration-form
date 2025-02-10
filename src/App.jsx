import Login from './Components/Login'
import Register from './Components/Register'
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom"
import './App.css'
import Todolist from './Pages/Todolist'
import ProtectedRoutes from './Services/ProtectedRoutes'

function App() {


  return (
    <>
      <HashRouter>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        {/* protected route */}
        <Route path="/" element={<ProtectedRoutes></ProtectedRoutes>}>
        {/* <Route path='/' element={<Todolist/>}></Route> */}
        <Route index element={<Todolist />} />
        </Route>
    


       


      </Routes>
      {/* </BrowserRouter> */}
      </HashRouter>
    </>
  )
}

export default App
