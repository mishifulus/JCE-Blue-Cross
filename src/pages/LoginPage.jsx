import React, { useState }from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import logo from "../assets/logo.png"
import "../styles/LoginPage.css"

const LoginPage = () => {

  const [user, setUser] = useState(null);
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setUserInput({
      username: "",
      password: "",
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //ENVIAR USUARIO
    swal(
      `Bienvenido ${userInput.username} con ${userInput.password}`,
      "Iniciaste sesión correctamente",
      "success"
    );
    navigate("/home");
  };

  return (
    <div className='container-fluid'>
        <div className="card">
          <div>
            <img src={logo} alt='Logo' height={'90px'}/>
          </div>
          <div className="card-body">
            <div className="row g-1 align-items-center mb-3 form-row">
              <div className="col-auto">
                <label className="col-form-label me-3">Username</label>
              </div>
              <div className="col-auto">
                <input type="text" id="txtUsername" className="form-control" name="username" value={userInput.username} onChange={handleChange}/>
              </div>
              <div>
                <span id="usernameSpan" className="form-text">
                  Enter your name
                </span>
              </div>
            </div>
            <div className="row g-1 align-items-center mb-5 form-row">
              <div className="col-auto">
                <label className="col-form-label me-3">Password</label>
              </div>
              <div className="col-auto">
                <input type="password" id="txtPassword" className="form-control" name="password" value={userInput.password} onChange={handleChange}/>
              </div>
              <div>
                <span id="passwordSpan" className="form-text ms-4">
                  Enter your password.
                </span>
              </div>
            </div>
            <div className="align-items-center">
              <button className="btn btn-search me-5" id='btnReset' onClick={handleReset}>Reset</button>
              <button className="btn btn-search" id='btnLogin' onClick={handleSubmit}>Login</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LoginPage