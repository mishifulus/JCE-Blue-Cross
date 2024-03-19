import React, { useState, useContext }from 'react'
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import logo from "../assets/logo.png"
import "../styles/LoginPage.css"
import UserContext from '../context/UserContext';

const LoginPage = () => {

  const { login } = useContext(UserContext);

  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = await login(userInput.username, userInput.password);

    // 0: EMPTY FIELDS, 1: CORRECT LOGIN, 2: ERROR, 3: USERNAME, 4: PASSWORD, 5: EXPIRED, 6: BLOCKED
    if (auth == 1)
    {
      swal(
        `You're welcome ${userInput.username} with ${userInput.password}`,
        "Login",
        "success"
      );
      navigate("/home");
    }

    else if (auth == 2)
    {
      swal(
        `ERROR`,
        "Please contact system admin (01800-233-45-63)",
        "error"
      );
      navigate("/login");
    }

    else if (auth == 3)
    {
      setMessage("Username should be valid");
      navigate("/login");
    }

    else if (auth == 4)
    {
      setMessage("Password is incorrect");
      navigate("/login");
    }

    else if (auth == 5)
    {
      setMessage("User has expired, please contact system admin (01800-233-45-63)");
      navigate("/login");
    }

    else if (auth == 6)
    {
      setMessage("User is bloqued, please contact system admin (01800-233-45-63)");
      navigate("/login");
    }

    else if (auth == 0)
    {
      setMessage("Username and password are mandatory fields");
      navigate("/login");
    }
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
            </div>
            <div className="row g-1 align-items-center mb-3 form-row">
              <div className="col-auto">
                <label className="col-form-label me-3">Password</label>
              </div>
              <div className="col-auto">
                <input type="password" id="txtPassword" className="form-control" name="password" value={userInput.password} onChange={handleChange}/>
              </div>
            </div>
            <div className="align-items-center mb-4">
              <p className='text-danger fw-semibold'>{message}</p>
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