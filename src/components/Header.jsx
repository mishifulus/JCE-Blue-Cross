import React, { useState } from 'react'
import logo from "../assets/logo.png"
import "../styles/Header.css"
import { Link } from 'react-router-dom'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
        {isLoggedIn && (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="navbar-row language-selector">
                <div className='d-flex justify-content-center align-items-center'>
                    <p className='me-2 ms-5 text-language'>Language:</p> 
                    <select class="form-select" aria-label="Default select example">
                        <option selected>English</option>
                        <option value="1">Spanish</option>
                        <option value="2">French</option>
                    </select>
                </div>
                <p className='me-5 text-language'>Welcome Dr(a) XXXX</p>
            </div>
            <div className="navbar-row logo-and-search">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt='Logo' height={'70px'} className='ms-4'/>
                </Link>
                <form className="d-flex" role="search">
                    <input className="form-control" type="search" placeholder="Hi!" aria-label="Search"/>
                    <button className="btn btn-search me-3" type="submit">Search</button>
                </form>
            </div>
            <div className=' navigation-menu'>
                <button className="navbar-toggler btn-search" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Home Page</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/providerfinder'>Provider Finder</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/submitclaim'>Submit Claim</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/errormanager'>Error Manager</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/payorregistration'>Payor Registration</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link me-4" to='/users'>Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ms-4" to='/config'>Config</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        )}
        </>
    );
}

export default Header