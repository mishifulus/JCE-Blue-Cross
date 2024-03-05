import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import "../styles/LoginPage.css"

const LoginPage = () => {
  return (
    <div className='container-fluid'>
        <div className="card">
          <div>
            <img src={logo} alt='Logo' height={'90px'}/>
          </div>
          <div className="card-body">
            <div className="row g-1 align-items-center mb-3 form-row">
              <div className="col-auto">
                <label for="txtUsername" className="col-form-label me-3">Username</label>
              </div>
              <div className="col-auto">
                <input type="text" id="txtUsername" className="form-control" />
              </div>
              <div>
                <span id="usernameSpan" className="form-text">
                  Enter your name
                </span>
              </div>
            </div>
            <div className="row g-1 align-items-center mb-5 form-row">
              <div className="col-auto">
                <label for="txtPassword" className="col-form-label me-3">Password</label>
              </div>
              <div className="col-auto">
                <input type="password" id="txtPassword" className="form-control"/>
              </div>
              <div>
                <span id="passwordSpan" className="form-text ms-4">
                  Enter your password.
                </span>
              </div>
            </div>
            <div className="align-items-center">
              <button className="btn btn-search me-5" id='btnReset'>Reset</button>
              <button className="btn btn-search" id='btnLogin'>Login</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LoginPage