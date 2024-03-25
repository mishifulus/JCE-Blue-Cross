import React, { useState, useContext, useEffect } from 'react'
import "../styles/Modules.css"
import { FaEdit, FaTrash } from 'react-icons/fa';
import swal from "sweetalert";
import PayerContext from '../context/PayerContext';
import UserContext from '../context/UserContext';

const PayorRegistrationPage = () => {

  const { deletePayer, postPayer, putPayer, getPayers, payers } = useContext(PayerContext);
  const { currentUser } = useContext(UserContext);
  const [seeForm, setSeeForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [payersInput, setPayersInput] = useState({
    payorId: 0,
    payorName: "",
    payorAddress: "",
    zipCode: "",
    state: "",
    city: "",
    status: 1,
    registeringUser: currentUser,
  });

  const handleChange = (e) => {
    setPayersInput({
      ...payersInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setPayersInput({
      payorId: 0,
      payorName: "",
      payorAddress: "",
      zipCode: "",
      state: "",
      city: "",
      status: 1,
      registeringUser: currentUser,
    });
  };

  const handleSubmit = async () => {
    if (payersInput.payorId)
    {
      putPayer(payersInput.payorId, payersInput);
      swal(
        `Payer saved`,
        "Update",
        "success"
      );
      await getPayers();
    }
    else
    {
      postPayer(payersInput);
      swal(
        `Payer saved`,
        "Register",
        "success"
      );
      await getPayers();
    }
    handleReset();
    setSeeForm(false);
  };

  const handleDelete = async (id) => {
    var result = await deletePayer(id);

    if (result)
    {
      swal(
        `Payer deleted`,
        "Delete",
        "success"
      );
      await getPayers();
    }
    else
    {
      swal(
        `Error`,
        "Delete",
        "success"
      );
    }
  };

  const handleEdit = (payer) => {
    setPayersInput({
      ...payer,
    });
    setSeeForm(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        const lastFetchTime = localStorage.getItem('lastFetchTime');
        const currentTime = new Date().getTime();
        if (!lastFetchTime || (currentTime - parseInt(lastFetchTime)) > 60000) {
          await getPayers();
          localStorage.setItem('lastFetchTime', currentTime.toString());
        }
      }
      catch (error)
      {
        console.error('Error al obtener payers:', error);
      }
      finally
      {
        setLoading(false);
      }
    };
    fetchData();
  }, [getPayers]);

  const seeForms = () => 
  {
    setSeeForm(true);
    handleReset();
  }

  const seeFormf = () => 
  {
    setSeeForm(false);
  }

  return (
    <div className='container' style={{  maxHeight: '80vh' }}>
      <div className='row container'>
        <div className='col-3 header'>
          <h2 className='ms-4 mb-4'>Payor Registration</h2>
        </div>
        {!seeForm ? (
        <div className='col-9 btnheader'>
          <button className='btn btn-search' onClick={seeForms}>New Payor</button>
        </div>
        ):
        <div className='col-9 btnheader'>
          <button className='btn btn-danger fw-bold' onClick={seeFormf}>X</button>
        </div>
        }
      </div>

      {seeForm ? (
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
              <form>
                <input type="text" id="inputId" name='payorId' value={payersInput.payorId} onChange={handleChange} className="ms-4 form-control" hidden={true} readOnly disabled/>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputName" name='payorName' value={payersInput.payorName} onChange={handleChange} className="form-control" minLength={1} maxLength={30}/>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Address</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputAddress" name='payorAddress' value={payersInput.payorAddress} onChange={handleChange} className="form-control" minLength={1} maxLength={50} />
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Zip Code</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputZipCode" name='zipCode' value={payersInput.zipCode} onChange={handleChange} className="form-control" minLength={1} maxLength={5}/>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">State</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputState" name='state' value={payersInput.state} onChange={handleChange} className="form-control" minLength={1} maxLength={3}/>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">City</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputCity" name='city' value={payersInput.city} onChange={handleChange} className="form-control" minLength={1} maxLength={30}/>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Status</label>
                  <div className="col-sm-10">
                  {payersInput.status == 0 ? (
                    <select className="form-select" name="status" value={payersInput.status} onChange={handleChange}>
                      <option value="0">Inactive</option>
                      <option value="1">Active</option>
                    </select>
                  ):
                    <select className="form-select" name="status" value={payersInput.status} onChange={handleChange} readOnly disabled>
                      <option value="0">Inactive</option>
                      <option value="1">Active</option>
                    </select>
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
      ):null}

      <div className='col-10 tableModule'>
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <td className='tdhead'>ID</td>
              <td className='tdhead'>Name</td>
              <td className='tdhead'>Address</td>
              <td className='tdhead'>Zip</td>
              <td className='tdhead'>State</td>
              <td className='tdhead'>City</td>
              <td className='tdhead'>Registered by</td>
              <td className='tdhead'>Status</td>
              <td className='tdhead tdbuttons'></td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={"8"}>Loading...</td>
              </tr> 
            ): payers.map(payer => (
              <tr key={payer.payorId}>
                <td>{payer.payorId}</td>
                <td>{payer.payorName}</td>
                <td>{payer.payorAddress}</td>
                <td>{payer.zipCode}</td>
                <td>{payer.state}</td>
                <td>{payer.city}</td>
                <td>{payer.registeringUser.name} {payer.registeringUser.lastName}</td>
                <td>{payer.status == 0 ? ("Inactive") : "Active"}</td>
                <td className='p-1 ps-0 pe-0 tdbuttons'>
                  <button className='btn btn-primary m-1 pt-0 p-1' onClick={() => handleEdit(payer)}><FaEdit/></button>
                  <button className='btn btn-danger ms-0 m-1 pt-0 p-1' onClick={() => handleDelete(payer.payorId)}><FaTrash/></button>
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

export default PayorRegistrationPage