import React, { useState, useContext, useEffect } from 'react'
import "../styles/Modules.css"
import swal from "sweetalert";
import UserContext from '../context/UserContext';
import { useNavigate } from "react-router-dom";

const ConfigPage = () => {

  const { putUser, currentUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [showPasswords, setShowPasswords] = useState({
    motherQuestion: false,
    chilhoodQuestion: false,
    cityQuestion: false,
    carQuestion: false,
    universityQuestion: false,
    sportQuestion: false,
    bossQuestion: false,
    bandQuestion: false,
  });

  const [repassword, setRepassword] = useState(currentUser.password);
  
  const [usersInput, setUsersInput] = useState({
    userId: currentUser.userId,
    name: currentUser.name,
    lastName: currentUser.lastName,
    userAddress: currentUser.userAddress,
    zipCode: currentUser.zipCode,
    state: currentUser.state,
    city: currentUser.city,
    dob: currentUser.dob,
    sex: currentUser.sex,
    email: currentUser.email,
    role: currentUser.role,
    username: currentUser.username,
    password: currentUser.password,
    status: 2,
    expireDate: currentUser.expireDate,
    motherQuestion: currentUser.motherQuestion,
    chilhoodQuestion: currentUser.chilhoodQuestion,
    cityQuestion: currentUser.cityQuestion,
    carQuestion: currentUser.carQuestion,
    universityQuestion: currentUser.universityQuestion,
    sportQuestion: currentUser.sportQuestion,
    bossQuestion: currentUser.bossQuestion,
    bandQuestion: currentUser.bandQuestion,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const handleChangeP = (e) => {
    setRepassword(e.target.value);
  };

  const handleChange = (e) => {
    setUsersInput({
      ...usersInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setUsersInput({
      userId: currentUser.userId,
      name: currentUser.name,
      lastName: currentUser.lastName,
      userAddress: currentUser.userAddress,
      zipCode: currentUser.zipCode,
      state: currentUser.state,
      city: currentUser.city,
      dob: currentUser.dob,
      sex: currentUser.sex,
      email: currentUser.email,
      role: currentUser.role,
      username: currentUser.username,
      password: currentUser.password,
      status: 2,
      expireDate: currentUser.expireDate,
      motherQuestion: currentUser.motherQuestion,
      chilhoodQuestion: currentUser.chilhoodQuestion,
      cityQuestion: currentUser.cityQuestion,
      carQuestion: currentUser.carQuestion,
      universityQuestion: currentUser.universityQuestion,
      sportQuestion: currentUser.sportQuestion,
      bossQuestion: currentUser.bossQuestion,
      bandQuestion: currentUser.bandQuestion,
    });
    setRepassword(currentUser.password);
  };

  const handleSubmit = async () => {
    if (usersInput.username == "")
    {
      swal(
        `There are empty required fields`,
        "Register",
        "warning"
      );
    }
    else
    {
      if (repassword != usersInput.password)
      {
        swal(
          `Password does not match`,
          "Save",
          "warning"
        );
      }
      else
      {
        if (usersInput.userId)
        {
          if (usersInput.password == "")
          {
            usersInput.password == currentUser.password;
          }

          var result = await putUser(usersInput.userId, usersInput);
          if (result)
          {
            swal(
              `User saved`,
              "Update",
              "success"
            );
            logout();
            navigate("/login");
          }
          else
          {
            swal(
              `ERROR`,
              "Register",
              "error"
            );
          }
        }
        else
        {
          swal(
            `Error`,
            "Save",
            "error"
          );
        }
      }
      handleReset();
    }
  }

  return (
    <div className='container' style={{  maxHeight: '80vh' }}>
      <div className='row container'>
        <div className='col-3 header'>
          <h3 className='ms-4 mb-4 text-decoration-underline'>Config</h3>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <form>
              <input type="text" id="inputId" name='userId' value={usersInput.userId} onChange={handleChange} className="ms-4 form-control" hidden={true} readOnly disabled/>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Username *</label>
                <div className="col-sm-10">
                  <input type="text" id="inputUsername" name='username' value={usersInput.username} onChange={handleChange} className="form-control" minLength={1} maxLength={30} required/>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Password *</label>
                <div className="col-sm-10">
                  <input type="password" id="inputPassword" name='password' value={usersInput.password} onChange={handleChange} className="form-control" minLength={1} maxLength={10} required/>
                </div>
              </div>
              <div className='mb-5 row'>
                <label className="col-sm-2 col-form-label">Confirm Password *</label>
                <div className="col-sm-10">
                  <input type="password" id="inputPasswordr" name='repassword' value={repassword} onChange={handleChangeP} className="form-control" minLength={1} maxLength={10} required/>
                </div>
              </div>
              <h5 className='ms-4 mb-3 text-decoration-underline text-sm-start'>Security Questions</h5>
              <div className='mb-3 row'>
                <label className="col-form-label text-sm-start">What is the name of your mother? *</label>
                <div className="input-group col-sm-10">
                  <input type={showPasswords["motherQuestion"] ? "text" : "password"} className="form-control" name='motherQuestion' value={usersInput["motherQuestion"]} onChange={handleChange} required/>
                  <button className="btn btn-search" type="button" onClick={() => togglePasswordVisibility("motherQuestion")}>{showPasswords["motherQuestion"] ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-form-label text-sm-start">What was your chilhood toy? *</label>
                <div className="input-group col-sm-10">
                  <input type={showPasswords["chilhoodQuestion"] ? "text" : "password"} className="form-control" name='chilhoodQuestion' value={usersInput["chilhoodQuestion"]} onChange={handleChange} required/>
                  <button className="btn btn-search" type="button" onClick={() => togglePasswordVisibility("chilhoodQuestion")}>{showPasswords["chilhoodQuestion"] ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-form-label text-sm-start">What city are you from? *</label>
                <div className="input-group col-sm-10">
                  <input type={showPasswords["cityQuestion"] ? "text" : "password"} className="form-control" name='cityQuestion' value={usersInput["cityQuestion"]} onChange={handleChange} required/>
                  <button className="btn btn-search" type="button" onClick={() => togglePasswordVisibility("cityQuestion")}>{showPasswords["cityQuestion"] ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-form-label text-sm-start">What was your first car? *</label>
                <div className="input-group col-sm-10">
                  <input type={showPasswords["carQuestion"] ? "text" : "password"} className="form-control" name='carQuestion' value={usersInput["carQuestion"]} onChange={handleChange} required/>
                  <button className="btn btn-search" type="button" onClick={() => togglePasswordVisibility("carQuestion")}>{showPasswords["carQuestion"] ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-form-label text-sm-start">Where did you go to university? *</label>
                <div className="input-group col-sm-10">
                  <input type={showPasswords["universityQuestion"] ? "text" : "password"} className="form-control" name='universityQuestion' value={usersInput["universityQuestion"]} onChange={handleChange} required/>
                  <button className="btn btn-search" type="button" onClick={() => togglePasswordVisibility("universityQuestion")}>{showPasswords["universityQuestion"] ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-form-label text-sm-start">What is your favorite sport? *</label>
                <div className="input-group col-sm-10">
                  <input type={showPasswords["sportQuestion"] ? "text" : "password"} className="form-control" name='sportQuestion' value={usersInput["sportQuestion"]} onChange={handleChange} required/>
                  <button className="btn btn-search" type="button" onClick={() => togglePasswordVisibility("sportQuestion")}>{showPasswords["sportQuestion"] ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-form-label text-sm-start">Who was your first boss? *</label>
                <div className="input-group col-sm-10">
                  <input type={showPasswords["bossQuestion"] ? "text" : "password"} className="form-control" name='bossQuestion' value={usersInput["bossQuestion"]} onChange={handleChange} required/>
                  <button className="btn btn-search" type="button" onClick={() => togglePasswordVisibility("bossQuestion")}>{showPasswords["bossQuestion"] ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-form-label text-sm-start">What is your favorite band? *</label>
                <div className="input-group col-sm-10">
                  <input type={showPasswords["bandQuestion"] ? "text" : "password"} className="form-control" name='bandQuestion' value={usersInput["bandQuestion"]} onChange={handleChange} required/>
                  <button className="btn btn-search" type="button" onClick={() => togglePasswordVisibility("bandQuestion")}>{showPasswords["bandQuestion"] ? "Hide" : "Show"}</button>
                </div>
              </div>

            </form>
          </div>
          <div className='mb-2 text-start ms-5'>
            * Datos obligatorios
          </div>
        </div>
        <div className='d-flex col-md-6 offset-md-6 mb-4'>
          <div className='col-2 me-5'>
            <div className="row g-3">
              <button className='btn btn-search' onClick={handleReset}>Reset</button>
            </div>
          </div>
          <div className='col-2 ms-5'>
            <div className="row g-3">
              <button className='btn btn-search' onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className='mb-5 mt-5'>-</div>
    </div>
  )
}

export default ConfigPage