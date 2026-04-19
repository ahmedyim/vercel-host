import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import api  from "../service/api.js";
function Login() {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
      try {
          let response=await api.post('/users/login', { phone: phone, password }) 
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("userId" ,response.data.userId)
         navigate("/messages")
        } catch (error) {
        // console.log(error)
      }
  }
  return (
    <div className="container-login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div>
          <div className="title">Login</div>
          <label>Email</label>
          <br />
          <input
            type="text"
            placeholder="Enter your Phone Number"
            onChange={(e) => {
              setPhone(e.target.value);
              setError("");
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </div>
        <div>
          <small className="error">{error}</small>
        </div>
        <button className="login">
          Login
        </button>
        <div>
          <small>
            Don't have an account? <Link to="/register">Register</Link>
          </small>
        </div>
      </form>
    </div>
  );
}
export default Login;
