import React, { useState, useContext, useEffect } from 'react'
import "../styles/Modules.css"
import { FaEdit, FaTrash } from 'react-icons/fa';
import swal from "sweetalert";
import UserContext from '../context/UserContext';

const UsersPage = () => {

  const { deleteUser, postUser, putUser, getUser, getUsers, user, users, currentUser } = useContext(UserContext);
  const [seeForm, setSeeForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [usersInput, setUsersInput] = useState({
    userId: "",
    name: "",
    lastName: "",
    userAddress: "",
    zipCode: "",
    state: "",
    city: "",
    dob: "",
    sex: "",
    email: "",
    role: "",
    username: "",
    password: "",
    expiredDate: "",
    status: "",
  });

  const handleChange = (e) => {
    setUsersInput({
      ...usersInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setUsersInput({
      userId: "",
      name: "",
      lastName: "",
      userAddress: "",
      zipCode: "",
      state: "",
      city: "",
      dob: "",
      sex: "",
      email: "",
      role: "",
      username: "",
      password: "",
      expiredDate: "",
      status: "",
    });
  };

  const handleSubmit = () => {
    setSeeForm(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        const lastFetchTime = localStorage.getItem('lastFetchTime');
        const currentTime = new Date().getTime();
        if (!lastFetchTime || (currentTime - parseInt(lastFetchTime)) > 60000) {
          await getUsers();
          localStorage.setItem('lastFetchTime', currentTime.toString()); // Actualizar el tiempo de la última actualización
        }
        
      }
      catch (error)
      {
        console.error('Error al obtener usuarios:', error);
      }
      finally
      {
        setLoading(false);
      }
    };
    fetchData();
  }, [getUsers]);

  const seeForms = () => 
  {
    setSeeForm(true);
  }

  const seeFormf = () => 
  {
    setSeeForm(false);
  }

  const formatDate = (dateString) => {
    return dateString.slice(0, 10);
  }

  return (
    <div className='container' style={{  maxHeight: '80vh' }}>
      <div className='row container'>
        <div className='col-3 header'>
          <h2 className='ms-4 mb-4'>Users</h2>
        </div>
        {!seeForm ? (
        <div className='col-9 btnheader'>
          <button className='btn btn-search' onClick={seeForms}>New User</button>
        </div>
        ):
        <div className='col-9 btnheader'>
          <button className='btn btn-danger fw-bold' onClick={seeFormf}>X</button>
        </div>}
      </div>

      {seeForm ? (
      <div>
        <div className='d-flex col-md-6 offset-md-3 mb-1'>
        <input type="text" id="inputId" name='userId' value={usersInput.userId} onChange={handleChange} className="ms-4 form-control" hidden={true} />
          <div className='col-6 ms-2'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Name</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputName" name='name' value={usersInput.name} onChange={handleChange} className="ms-4 form-control" />
              </div>
            </div>
          </div>
          <div className='col-6 ms-4'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label me-1 ms-2">Last Name</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputLastName" name='lastName' value={usersInput.lastName} onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex col-md-6 offset-md-3 mb-1'>
          <div className='col-6 '>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Address</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputAddress" name='userAddress' value={usersInput.userAddress} onChange={handleChange} className="ms-4 form-control" />
              </div>
            </div>
          </div>
          <div className='col-6 ms-5'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Zip Code</label>
              </div>
              <div className="col-9">
                <input type="text" id="inputZipCode" name='zipCode' value={usersInput.zipCode} onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex col-md-6 offset-md-3 mb-1'>
          <div className='col-6'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">State</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputState" name='state' value={usersInput.state} onChange={handleChange} className="ms-5 form-control" />
              </div>
            </div>
          </div>
          <div className='col-6 ms-5'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label me-3">City</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputCity" name='city' value={usersInput.city} onChange={handleChange} className="ms-4 form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex col-md-6 offset-md-3 mb-1'>
          <div className='col-6'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">DOB</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputDob" name='dob' value={usersInput.dob} onChange={handleChange} className="ms-5 form-control" />
              </div>
            </div>
          </div>
          <div className='col-6 ms-5'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label me-3">Sex</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputSex" name='sex' value={usersInput.sex} onChange={handleChange} className="ms-4 form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex col-md-6 offset-md-3 mb-1'>
          <div className='col-6'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Email</label>
              </div>
              <div className="col-auto">
                <input type="email" id="inputEmails" name='email' value={usersInput.email} onChange={handleChange} className="ms-5 form-control" />
              </div>
            </div>
          </div>
          <div className='col-6 ms-5'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label me-2">Role</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputRole" name='role' value={usersInput.role} onChange={handleChange} className="ms-4 form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex col-md-6 offset-md-3 mb-1'>
          <div className='col-6'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Username</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputUsername" name='username' value={usersInput.username} onChange={handleChange} className="ms-3 form-control" />
              </div>
            </div>
          </div>
          <div className='col-6 ms-5'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Password</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputPassword" name='password' value={usersInput.password} onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex col-md-6 offset-md-3 mb-4'>
          <div className='col-6'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Expired Date</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputExpired" name='expiredDate' value={usersInput.expiredDate} onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
          <div className='col-6 ms-5'>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label className="col-form-label">Status</label>
              </div>
              <div className="col-auto">
                <input type="text" id="inputStatus" name='status' value={usersInput.status} onChange={handleChange} className="ms-4 form-control" />
              </div>
            </div>
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
      
      ): null}
      <div className='col-10 tableModule'>
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <td className='tdhead'>ID</td>
              <td className='tdhead'>Name</td>
              <td className='tdhead'>Last Name</td>
              <td className='tdhead'>Address</td>
              <td className='tdhead'>Zip</td>
              <td className='tdhead'>State</td>
              <td className='tdhead'>City</td>
              <td className='tdhead'>DOB</td>
              <td className='tdhead'>Sex</td>
              <td className='tdhead'>Email</td>
              <td className='tdhead'>Role</td>
              <td className='tdhead'>Status</td>
              <td className='tdhead tdbuttons'></td>
            </tr>
          </thead>
          <tbody>
          {loading ? (
            <tr>
              <td colSpan={"13"}>Loading...</td>
            </tr> 
          ) : users.map(user => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.userAddress}</td>
              <td>{user.zipCode}</td>
              <td>{user.state}</td>
              <td>{user.city}</td>
              <td>{formatDate(user.dob)}</td>
              <td>{user.sex}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td className='p-1 ps-0 pe-0 tdbuttons'>
                <button className='btn btn-primary m-1 pt-0 p-1'><FaEdit/></button>
                <button className='btn btn-danger ms-0 m-1 pt-0 p-1'><FaTrash/></button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className='mb-5'>-</div>
    </div>
  )
}

export default UsersPage