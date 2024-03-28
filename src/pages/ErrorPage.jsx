import React from 'react'
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import "../styles/LoginPage.css"

const ErrorPage = () => {
  return (
    <div className='container-fluid'>
      <div className='text-light'>-</div>
        <div className="card">
          <div>
            <img src={logo} alt='Logo' height={'90px'}/>
          </div>
          <div className="card-body">
            <div className="row g-1 align-items-center mb-4 mt-4 form-row">
              <div className="col-auto">
                <p className='fw-semibold'>The page you are trying to navigate to does not exist. Check the link in the browser or return to home.</p>
              </div>
            </div>
            <div className="align-items-center">
              <Link className="btn btn-search" id='btnBack' to='/login'>Back to Home</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ErrorPage