import React, { useState, useContext, useEffect } from 'react'
import "../styles/Modules.css"
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { RiAddCircleLine } from 'react-icons/ri';
import swal from "sweetalert";
import PayerContext from '../context/PayerContext'
import UserContext from '../context/UserContext'
import ErrorContext from '../context/ErrorContext';

const ErrorManagerPage = () => {
  const { deleteError, postError, putError, getErrors, errors } = useContext(ErrorContext);
  const { currentUser } = useContext(UserContext);
  const { getPayers, getPayer, payers, payer } = useContext(PayerContext);
  // CONDICIONES
  // PAYER ERRORS
  const [seeForm, setSeeForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [seeFormPayers, setSeeFormPayers] = useState(false);

  const [errorsInput, setErrorsInput] = useState({
    errorId: 0,
    message: "",
    description: "",
    status: 1,
    registeringUser: currentUser
  });

  const [payerErrorInput, setErrorPayerInput] = useState({
    error: null,
    payor: null,
  });

  const handleChange = (e) => {
    setErrorsInput({
      ...errorsInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setErrorsInput({
      errorId: 0,
      message: "",
      description: "",
      status: 1,
      registeringUser: currentUser
    });
  };

  const handleSubmit = async () => {
    if (errorsInput.errorId)
    {
      putError(errorsInput.errorId, errorsInput);
      swal(
        `Error saved`,
        "Update",
        "success"
      );
      await getErrors();
    }
    else
    {
      postError(errorsInput);
      swal(
        `Error saved`,
        "Register",
        "success"
      );
      await getErrors();
    }
    handleReset();
    setSeeForm(false);
  };

  const handleDelete = async (id) => {
    var result = await deleteError(id);

    if (result)
    {
      swal(
        `Error deleted`,
        "Delete",
        "success"
      );
      await getErrors();
    }
    else
    {
      swal(
        `Error`,
        "Delete",
        "warning"
      );
    }
  };

  const handleEdit = (error) => {
    setErrorsInput({
      ...error,
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
          await getErrors();
          await getPayers();
          localStorage.setItem('lastFetchTime', currentTime.toString());
        }
      }
      catch (error)
      {
        console.error('Error al obtener errores:', error);
      }
      finally
      {
        setLoading(false);
      }
    };
    fetchData();
  }, [getErrors, getPayers]);

  const seeForms = () => 
  {
    setSeeForm(true);
    handleReset();
  };

  const seeFormf = () => 
  {
    setSeeForm(false);
  };

  const seeFormsP = (error) => 
  {
    setSeeFormPayers(true);
    //handleResetP();
  };

  const seeFormfP = () => 
  {
    setSeeFormPayers(false);
  };

  return (
    <div className='container' style={{  maxHeight: '80vh' }}>
      <div className='row container'>
        <div className='col-3 header'>
          <h3 className='ms-4 mb-4 text-decoration-underline'>Error Manager</h3>
        </div>
        {!seeForm ? (
        <div className='col-9 btnheader'>
          <button className='btn btn-search' onClick={seeForms}>New Error</button>
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
                <input type="text" id="inputId" name='errorId' value={errorsInput.errorId} onChange={handleChange} className="ms-4 form-control" hidden={true} readOnly disabled/>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Message</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputName" name='message' value={errorsInput.message} onChange={handleChange} className="form-control" minLength={1} maxLength={60}/>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Description</label>
                  <div className="col-sm-10">
                    <input type="text" id="inputAddress" name='description' value={errorsInput.description} onChange={handleChange} className="form-control" minLength={1} maxLength={200} />
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

      {seeFormPayers ? (
        <>
      <div className='row container'>
        <div className='col-3'>
          <h5 className='ms-4 mb-4 text-decoration-underline'>Payers</h5>
        </div>
        <div className='col-9 btnpayer'>
          <button className='btn btn-danger fw-bold' onClick={seeFormfP}>X</button>
        </div>
      </div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
              <form>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Payers disponibles</label>
                  <div className="col-sm-10">
                    <select className="form-select" multiple >
                      {payers.map(payer => (
                        <option value={payer.payorId}>{payer.payorName}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='d-flex col-md-6 offset-md-5 mb-3'>
                  <div className='col-2 ms-2'>
                    <div className="row">
                      <button className='btn btn-secondary'><FaArrowDown/></button>
                    </div>
                  </div>
                  <div className='col-2 ms-5'>
                    <div className="row">
                      <button className='btn btn-secondary'><FaArrowUp/></button>
                    </div>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Payers Aplicados</label>
                  <div className="col-sm-10">
                    <select className="form-select" multiple >
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        </>
      ):null}

      <div className='col-10 tableModule'>
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <td className='tdhead'>ID</td>
              <td className='tdhead'>Message</td>
              <td className='tdhead'>Description</td>
              <td className='tdhead'>Registered by</td>
              <td className='tdhead tdbuttons'></td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={"8"}>Loading...</td>
              </tr> 
            ): errors.map(error => (
              <tr key={error.errorId}>
                <td>{error.errorId}</td>
                <td>{error.message}</td>
                <td>{error.description}</td>
                <td>{error.registeringUser.name} {error.registeringUser.lastName}</td>
                <td className='p-1 ps-0 pe-0 tdbuttons'>
                  <button className='btn btn-success ms-0 m-1 pt-0 p-1' onClick={() => seeFormsP(error)}><RiAddCircleLine size={20}/></button>
                  <button className='btn btn-warning ms-0 m-1 pt-0 p-1'><RiAddCircleLine size={20}/></button>
                  <button className='btn btn-primary ms-0 m-1 pt-0 p-1' onClick={() => handleEdit(error)}><FaEdit/></button>
                  <button className='btn btn-danger ms-0 m-1 pt-0 p-1' onClick={() => handleDelete(error.errorId)}><FaTrash/></button>
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

export default ErrorManagerPage