import React, { useState, useContext, useEffect } from 'react'
import "../styles/Modules.css"
import { FaEdit, FaTrash } from 'react-icons/fa';
import swal from "sweetalert";
import ProviderContext from '../context/ProviderContext';
import UserContext from '../context/UserContext';

const ProviderFinderPage = () => {

  const { deleteProvider, postProvider, putProvider, getProviders, providers } = useContext(ProviderContext);
  const { currentUser } = useContext(UserContext);
  const [seeForm, setSeeForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [providersInput, setProvidersInput] = useState({
    providerId: 0,
    providerName: "",
    type: 0,
    providerAddress: "",
    zipCode: "",
    state: "",
    city: "",
    status: 1,
    registeringUser: currentUser,
  });

  const handleChange = (e) => {
    setProvidersInput({
      ...providersInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setProvidersInput({
      providerId: 0,
      providerName: "",
      type: 0,
      providerAddress: "",
      zipCode: "",
      state: "",
      city: "",
      status: 1,
      registeringUser: currentUser,
    });
  };

  const handleSubmit = async () => {
    if (providersInput.providerId)
    {
      putProvider(providersInput.providerId, providersInput);
      swal(
        `Provider saved`,
        "Update",
        "success"
      );
      await getProviders();
    }
    else
    {
      postProvider(providersInput);
      swal(
        `Provider saved`,
        "Register",
        "success"
      );
      await getProviders();
    }
    handleReset();
    setSeeForm(false);
  };

  const handleDelete = async (id) => {
    var result = await deleteProvider(id);

    if (result)
    {
      swal(
        `Provider deleted`,
        "Delete",
        "success"
      );
      await getProviders();
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

  const handleEdit = (provider) => {
    setProvidersInput({
      ...provider,
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
          await getProviders();
          localStorage.setItem('lastFetchTime', currentTime.toString());
        }
      }
      catch (error)
      {
        console.error('Error al obtener providers:', error);
      }
      finally
      {
        setLoading(false);
      }
    };
    fetchData();
  }, [getProviders]);

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
          <h3 className='ms-4 mb-4 text-decoration-underline'>Provider Finder</h3>
        </div>
        {!seeForm ? (
        <div className='col-9 btnheader'>
          <button className='btn btn-search' onClick={seeForms}>New Provider</button>
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
                <input type="text" id="inputId" name='providerId' value={providersInput.providerId} onChange={handleChange} className="ms-4 form-control" hidden={true} readOnly disabled/>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputName" name='providerName' value={providersInput.providerName} onChange={handleChange} className="form-control" minLength={1} maxLength={30}/>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Type</label>
                  <div className="col-sm-10">
                    <select className="form-select" name="type" value={providersInput.type} onChange={handleChange}>
                      <option value="0">Institutional</option>
                      <option value="1">Professional</option>
                    </select>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Address</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputAddress" name='providerAddress' value={providersInput.providerAddress} onChange={handleChange} className="form-control" minLength={1} maxLength={50} />
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Zip Code</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputZipCode" name='zipCode' value={providersInput.zipCode} onChange={handleChange} className="form-control" minLength={1} maxLength={5}/>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">State</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputState" name='state' value={providersInput.state} onChange={handleChange} className="form-control" minLength={1} maxLength={3}/>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">City</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputCity" name='city' value={providersInput.city} onChange={handleChange} className="form-control" minLength={1} maxLength={30}/>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Status</label>
                  <div className="col-sm-10">
                  {providersInput.status == 0 ? (
                    <select className="form-select" name="status" value={providersInput.status} onChange={handleChange}>
                      <option value="0">Inactive</option>
                      <option value="1">Active</option>
                    </select>
                  ):
                    <select className="form-select" name="status" value={providersInput.status} onChange={handleChange} readOnly disabled>
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
              <td className='tdhead'>Type</td>
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
            ): providers.map(provider => (
              <tr key={provider.providerId}>
                <td>{provider.providerId}</td>
                <td>{provider.providerName}</td>
                <td>{provider.type == 0 ? ("Institutional") : "Professional"}</td>
                <td>{provider.providerAddress}</td>
                <td>{provider.zipCode}</td>
                <td>{provider.state}</td>
                <td>{provider.city}</td>
                <td>{provider.registeringUser.name} {provider.registeringUser.lastName}</td>
                <td>{provider.status == 0 ? ("Inactive") : "Active"}</td>
                <td className='p-1 ps-0 pe-0 tdbuttons'>
                  <button className='btn btn-primary m-1 pt-0 p-1' onClick={() => handleEdit(provider)}><FaEdit/></button>
                  <button className='btn btn-danger ms-0 m-1 pt-0 p-1' onClick={() => handleDelete(provider.providerId)}><FaTrash/></button>
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

export default ProviderFinderPage