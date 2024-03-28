import React from 'react'
import logo from "../assets/logo.png"
import insurance from "../assets/insurance.jpeg"
import "../styles/HomePage.css"

const HomePage = () => {
  return (
    <div className='container-fluid container'>
      <div className='text-light'>-</div>
        <div className="card">
          <div>
            <img src={logo} alt='Logo' height={'130px'}/>
          </div>
          <div className="card-body d-flex">
            <div className='col-6'>
              <div className='mt-5'>
                <h2 className='fw-light'>Welcome to the Blue Cross JCE system for the control of insurance claims in the United States</h2>
              </div>
              <div className='mt-5'>
                <h4 className='fw-lighter fst-italic'>Working together since 2021 for your health and your wallet</h4>
              </div>
            </div>
            <div className='col-6 offset-md-2'>
              <img className='mt-5' src={insurance} alt='Logo' height={'280px'}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomePage