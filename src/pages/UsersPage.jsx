import React, { useState, useContext, useEffect } from 'react'
import "../styles/Modules.css"
import { FaEdit, FaTrash } from 'react-icons/fa';
import swal from "sweetalert";
import UserContext from '../context/UserContext';

const UsersPage = () => {

  const { deleteUser, postUser, putUser, getUsers, users } = useContext(UserContext);
  const [seeForm, setSeeForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [usersInput, setUsersInput] = useState({
    userId: 0,
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
    expireDate: "",
    status: 1,
  });

  const handleChange = (e) => {
    setUsersInput({
      ...usersInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setUsersInput({
      userId: 0,
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
      expireDate: "",
      status: 1,
    });
  };

  const handleSubmit = async () => {
    if (usersInput.userId)
    {
      putUser(usersInput.userId, usersInput);
      swal(
        `User saved`,
        "Update",
        "success"
      );
      await getUsers();
    }
    else
    {
      usersInput.password = `${usersInput.username}JCE`;
      postUser(usersInput);
      swal(
        `User saved`,
        "Register",
        "success"
      );
      await getUsers();
    }
    handleReset();
    setSeeForm(false);
  }

  const handleDelete = async (id) => {
    var result = await deleteUser(id);

    if (result)
    {
      swal(
        `User deleted`,
        "Delete",
        "success"
      );
      await getUsers();
    }
    else
    {
      swal(
        `Error`,
        "Delete",
        "success"
      );
    }
  }

  const handleEdit = (user) => {
    setUsersInput({
      ...user,
      dob: user.dob ? formatDate(user.dob) : "",
      expireDate: user.expireDate ? formatDate(user.expireDate) : ""
    });
    setSeeForm(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        const lastFetchTime = localStorage.getItem('lastFetchTime');
        const currentTime = new Date().getTime();
        if (!lastFetchTime || (currentTime - parseInt(lastFetchTime)) > 60000) {
          await getUsers();
          localStorage.setItem('lastFetchTime', currentTime.toString());
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
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <form>
              <input type="text" id="inputId" name='userId' value={usersInput.userId} onChange={handleChange} className="ms-4 form-control" hidden={true} readOnly disabled/>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input type="text" id="inputName" name='name' value={usersInput.name} onChange={handleChange} className="form-control" minLength={1} maxLength={30}/>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Last Name</label>
                <div className="col-sm-10">
                  <input type="text" id="inputLastName" name='lastName' value={usersInput.lastName} onChange={handleChange} className="form-control" minLength={1} maxLength={30} />
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                  <input type="text" id="inputAddress" name='userAddress' value={usersInput.userAddress} onChange={handleChange} className="form-control" minLength={1} maxLength={50} />
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Zip Code</label>
                <div className="col-sm-10">
                  <input type="text" id="inputZipCode" name='zipCode' value={usersInput.zipCode} onChange={handleChange} className="form-control" minLength={1} maxLength={5}/>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">State</label>
                <div className="col-sm-10">
                  <input type="text" id="inputState" name='state' value={usersInput.state} onChange={handleChange} className="form-control" minLength={1} maxLength={3}/>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">City</label>
                <div className="col-sm-10">
                  <input type="text" id="inputCity" name='city' value={usersInput.city} onChange={handleChange} className="form-control" minLength={1} maxLength={30}/>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">DOB</label>
                <div className="col-sm-10">
                  <input type="date" id="inputDob" name='dob' value={usersInput.dob} onChange={handleChange} className="form-control" />
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Sex</label>
                <div className="col-sm-10">
                  <select className="form-select" name="sex" value={usersInput.sex} onChange={handleChange}>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option>
                  </select>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="email" id="inputEmails" name='email' value={usersInput.email} onChange={handleChange} className="form-control" minLength={1} maxLength={100}/>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Role</label>
                <div className="col-sm-10">
                  <select className="form-select" name='role' value={usersInput.role} onChange={handleChange}>
                    <option value="0">Administrator</option>
                    <option value="1">Member</option>
                    <option value="2">Provider</option>
                    <option value="3">Payor</option>
                  </select>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                  <input type="text" id="inputUsername" name='username' value={usersInput.username} onChange={handleChange} className="form-control" minLength={1} maxLength={30}/>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Expired Date</label>
                <div className="col-sm-10">
                  <input type="date" id="inputExpired" name='expireDate' value={usersInput.expireDate} onChange={handleChange} className="form-control" />
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label">Status</label>
                <div className="col-sm-10">
                {usersInput.status == 0 ? (
                  <input type="text" id="inputStatus" name='status' value={usersInput.status} onChange={handleChange} className="form-control"/>
                ):
                <input type="text" id="inputStatus" name='status' value={usersInput.status} onChange={handleChange} className="form-control" readOnly disabled/>
                }
                </div>
              </div>

            </form>
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
                <button className='btn btn-primary m-1 pt-0 p-1' onClick={() => handleEdit(user)}><FaEdit/></button>
                <button className='btn btn-danger ms-0 m-1 pt-0 p-1' onClick={() => handleDelete(user.userId)}><FaTrash/></button>
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