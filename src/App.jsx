import "./App.css";
// import {useEffect} from "react";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Hero from "./components/Hero";
// import Course from "./components/Course";
import Registration from "./pages/Registration";
import Message from "./components/Message";
import ProtectPage from "./service/protectPage";
// import Counter from "./Counter";
// import { useSelector } from "react-redux";
import Layout from "./Layout";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useState } from "react";
import api from "./service/api";
// import Counter from "./Counter";
// import ToDo from "./ToDo";
// import AddToCart from "./AddToCart";
// import api from "./service/api";
function App() {
// const counter = useSelector((state) => state.counter);
// const todo = useSelector((state) => state.todo);
// console.log(counter);
// console.log(todo);
// const fetchData = async () => {
//   try {
//     const response = await api.get('/posts');
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };
const [error,setError]=useState("")
const handleSubmit=(e)=>{
  e.preventDefault()
  let email=e.target[0].value
  let password=e.target[1].value
  if(!email || !password){
    setError("all fields are required")
    return
  } 
}
return(
  <div id="container">
   <form onSubmit={handleSubmit}>
    <input type="email" placeholder="Email"></input>
    <input type="password" placeholder="Password"></input>
    {error && <small>{error}</small>}
    <button>login</button> 
   </form>
  </div>
  //<BrowserRouter>
  // {/* <ToDo/> */}
  // {/* <Counter/> */}
  // <Routes>
  //  <Route path='/' element={<Layout sidebar={<SideBar/>} header={<Header/>}/>} />
  //  <Route path='/register' element={<Registration/>} />
  //  <Route path='/login' element={<Login/>} />
  //  <Route path='/about' element={<About/>} />
  //  <Route path='/contact' element={<Contact/>} />
  //  <Route path='/setting' element={<Setting/>} />
  //  <Route path='/profile' element={<ProtectPage><Profile/></ProtectPage>} />
  //  <Route path='/messages' element={<ProtectPage ><Message/></ProtectPage>} />
 
  // </Routes>
  //</BrowserRouter>   
)
}

export default App;
