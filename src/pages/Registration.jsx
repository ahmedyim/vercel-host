import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import "../css/Registration.css";
export default function Registration() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
     try {
    const response=await api.post("/users/createuser",{name,phone,password})
      navigate("/login")
     } catch (error) {
      
     }    
  };
  
  return (
    <div className="container-login">
      <form onSubmit={handleSubmit}>
        <div>
      <div className="title">Register</div>
      <label htmlFor="name">Name</label><br />
          <input
            type="text"
            id="name" 
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          >

          </input>
        </div>
        <div>
          <label htmlFor="phone">Phone</label><br />
          <input
            type="text"
            id="phone"
            placeholder="Enter your Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label><br />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>
        <button>Register</button>
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </form>
      {/* <button onClick={()=>handleClick(1)}>Click</button>
      <button onClick={()=>handleClick(2)}>Click</button> */}
    </div>
  );
}
