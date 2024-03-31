import React, { useState, useContext, useEffect } from 'react'
import "../styles/Modules.css"
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoReceiptOutline } from 'react-icons/io5';
import { RiAddCircleLine } from 'react-icons/ri';
import { RiMenuLine } from 'react-icons/ri';
import swal from "sweetalert";
import PayerContext from '../context/PayerContext'
import UserContext from '../context/UserContext'
import ErrorContext from '../context/ErrorContext';
import PayerErrorContext from '../context/PayerErrorContext';
import ConditionContext from '../context/ConditionContext';

const ErrorManagerPage = () => {
  const { deleteError, postError, putError, getErrors, errors } = useContext(ErrorContext);
  const { currentUser } = useContext(UserContext);
  const { getPayersActives, payersActives } = useContext(PayerContext);
  const { deleteCondition, postCondition, putCondition, getCondition, condition, conditionsByError, getConditionsByError } = useContext(ConditionContext);
  const { deletePayerError, postPayorError, getPayorErrorsByError, payerErrorsByError } = useContext(PayerErrorContext);

  const [seeForm, setSeeForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [seeFormPayers, setSeeFormPayers] = useState(false);
  const [seeFormConditions, setSeeFormConditions] = useState(false);

  const [errorsInput, setErrorsInput] = useState({
    errorId: 0,
    message: "",
    description: "",
    status: 1,
    registeringUser: currentUser
  });

  const [payerErrorInput, setErrorPayerInput] = useState({
    errorId: 0,
    payorId: 0,
  });

  const [conditionInput, setConditionInput] = useState({
    conditionId: 0,
    field: "",
    conditionLabel: "",
    value: "",
    errorId: 0
  });

  // ****************************************** ERROR ***************************************************
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
  }, [getErrors]);

  const seeForms = () => 
  {
    setSeeForm(true);
    handleReset();
  };

  const seeFormf = () => 
  {
    setSeeForm(false);
  };

  // ****************************************** PAYER ***************************************************

  const handleChangePayor = (e) => {
    const selectedPayor = e.target.value;
    setErrorPayerInput({
      ...payerErrorInput,
      payorId: selectedPayor !== "" ? selectedPayor : 0,
    });
  };

  const handleSubmitPayer = async (e) => {
    e.preventDefault();
    try
    {
      await postPayorError(payerErrorInput.errorId, payerErrorInput.payorId);
      swal(
        `Payer saved`,
        "Register",
        "success"
      );
    }
    catch (error)
    {
      console.error('Error while handling payer submission:', error);
    }
    await getPayorErrorsByError(payerErrorInput.errorId);
  };

  const handleDeletePayer = async (payorId, event) => {

    event.preventDefault();

    var result = await deletePayerError(payerErrorInput.errorId, payorId);

    if (result)
    {
      swal(
        `Payor deleted`,
        "Delete",
        "success"
      );
      await getPayorErrorsByError(payerErrorInput.errorId);
    }
    else
    {
      swal(
        `Error`,
        "Delete",
        "warning"
      );
    }
  }

  const addPayersForm = (errorId) => 
  {
    setSeeFormPayers(true);
    getPayorErrorsByError(errorId);
    getPayersActives();
    setErrorPayerInput({ ...payerErrorInput, errorId: errorId });
  };

  const seeFormfP = () => 
  {
    setSeeFormPayers(false);
    setErrorPayerInput(null);
  };


  // ****************************************** CONDITION ***************************************************

  const handleChangeCondition = (e) => {
    e.preventDefault();

    setConditionInput({
      ...conditionInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditCondition = (condition, event) => {
    event.preventDefault();

    setConditionInput({
      ...condition,
    });
  };

  const handleSubmitCondition = async (e) => {
    e.preventDefault();

    if (conditionInput.conditionId)
    {
      try
      {
        await putCondition(conditionInput.conditionId, conditionInput, conditionInput.errorId)
        swal(
          `Condition saved`,
          "Register",
          "success"
        );
      }
      catch (error)
      {
        console.error('Error while handling condition submission:', error);
      }
    }
    else
    {
      try
      {
        await postCondition(conditionInput, conditionInput.errorId)
        swal(
          `Condition saved`,
          "Register",
          "success"
        );
      }
      catch (error)
      {
        console.error('Error while handling condition submission:', error);
      }
    }
    await getConditionsByError(conditionInput.errorId);
  };

  const handleDeleteCondition = async (conditionId, errorId, event) => {

    event.preventDefault();

    var result = await deleteCondition(conditionId, errorId);

    if (result)
    {
      swal(
        `Payor deleted`,
        "Delete",
        "success"
      );
      await getConditionsByError(errorId);
    }
    else
    {
      swal(
        `Error`,
        "Delete",
        "warning"
      );
    }
  }

  const addConditionForm = (errorId) => 
  {
    setSeeFormConditions(true);
    getConditionsByError(errorId);
    setConditionInput({ ...conditionInput, errorId: errorId });
  };

  const seeFormfC = () => 
  {
    setSeeFormConditions(false);
    setConditionInput(null);
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
                <div className='row'>
                  <label className="col-sm-2 col-form-label">Available Payers</label>
                  <div className="col-sm-10">
                    <select className="form-select mt-2" name="payor" onChange={handleChangePayor}>
                      <option value="">Select</option>
                      {payersActives.map(payer => (
                      <option key={payer.payorId} value={payer.payorId}>{payer.payorId} - {payer.payorName} ({payer.payorAddress})</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='d-flex col-md-9 offset-md-6 mb-3'>
                  <div className='col-2 ms-2'>
                    <div className="row">
                      <button className='btn btn-secondary' onClick={handleSubmitPayer}>Add Payer</button>
                    </div>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Associated Payers</label>
                  <div className="col-sm-10">
                    <table className="table table-bordered border-dark">
                      <thead>
                        <tr>
                          <td className='tdhead'>ID</td>
                          <td className='tdhead'>Name</td>
                          <td className='tdhead'>Address</td>
                          <td className='p-1 ps-0 pe-0 tdbuttons'></td>
                        </tr>
                      </thead>
                      <tbody>
                        {payerErrorsByError && payerErrorsByError.length > 0 ? (
                          payerErrorsByError.map(payerError => (
                            <tr key={payerError.payorId}>
                              <td>{payerError.payorId}</td>
                              <td>{payerError.payorName}</td>
                              <td>{payerError.payorAddress}</td>
                              <td className='p-1 ps-0 pe-0 tdbuttons'><button className='btn btn-danger ms-0 m-1 pt-0 p-1'
                              onClick={() => handleDeletePayer(payerError.payorId, event)}><FaTrash/></button></td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3">There is no associated payer</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        </>
      ):null}

      {seeFormConditions ? (
        <>
      <div className='row container'>
        <div className='col-3'>
          <h5 className='ms-4 mb-4 text-decoration-underline'>Conditions</h5>
        </div>
        <div className='col-9 btnpayer'>
          <button className='btn btn-danger fw-bold' onClick={seeFormfC}>X</button>
        </div>
      </div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 offset-md-3'>
              <form>
                <div className='row mb-3'>
                  <input type="text" name='value' value={conditionInput.conditionId} className="form-control" onChange={handleChangeCondition} hidden disabled/>
                  <label className="col-sm-2 col-form-label">Field</label>
                  <div className="col-sm-10">
                    <select className="form-select" name="field" onChange={handleChangeCondition} value={conditionInput.field}>
                      <option value="">Select</option>
                      <option value="zipCode">Zip Code</option>
                      <option value="state">State</option>
                      <option value="city">City</option>
                      <option value="sex">Sex</option>
                      
                      <option value="claimNumber">Claim Number</option>
                      <option value="entryDate">Entry Date</option>
                      <option value="dischargeDate">Discharge Date</option>
                      <option value="institutionalClaimCode">Institutional Claim Code</option>
                      <option value="professionalClaimCode">Professional Claim Code</option>
                      <option value="typeBill">Type Bill</option>
                      <option value="referalNum">Referal Number</option>
                      <option value="serviceCode">Service Code</option>
                      <option value="authCode">Auth Code</option>
                      <option value="medicalRecordNumber">Medical Record Number</option>
                      <option value="payerClaimControlNumber">Payer Claim Control Number</option>
                      <option value="autoAccidentState">Auto Accident State</option>
                      <option value="fileInf">File Inf</option>
                      <option value="claimNote">Claim Note</option>
                      <option value="billingNote">Billing Note</option>
                      <option value="onsetSymptomDate">Onset Symptom Date</option>
                      <option value="initialTreatmentDate">Initial Treatment Date</option>
                      <option value="lastSeenDate">Last Seen Date</option>
                      <option value="acuteManifestationDate">Acute Manifestation Date</option>
                      <option value="accidentDate">Accident Date</option>
                      <option value="lastMenstrualDate">Last Menstrual Date</option>
                      <option value="lastXRayDate">Last X-Ray Date</option>
                      <option value="hearingVisionPrescriptionDate">Hearing Vision Prescription Date</option>
                      <option value="disabilityDate">Disability Date</option>
                      <option value="lastWorkedDate">Last Worked Date</option>
                      <option value="authorizedReturnWorkDate">Authorized Return Work Date</option>
                      <option value="assumedCareDate">Assumed Care Date</option>
                      <option value="repricerReceivedDate">Repricer Received Date</option>

                      <option value="principalDiagnosisCode">Principal Diagnosis Code</option>
                      <option value="admitingDiagnosisCode">Admiting Diagnosis Code</option>
                      <option value="patientReasonCode">Patient Reason Code</option>
                      <option value="externalCausesCode">External Causes Code</option>
                      <option value="diagnosisRelatedCode">DiagnosisRelatedCode</option>
                      <option value="otherDiagnosisCode">Other Diagnosis Code</option>
                      <option value="principalProcedureCode">Principal Procedure Code</option>
                      <option value="otherProcedureCode">Other Procedure Code</option>
                      <option value="occurrenceSpamCode">Occurrence Spam Code</option>
                      <option value="occurrenceInformationCode">Occurrence Information Code</option>
                      <option value="valueInformationCode">Value Information Code</option>
                      <option value="conditionInformationCode">Condition Information Code</option>
                      <option value="treatmentCodeCode">Treatment Code</option>
                      <option value="claimPricingCode">Claim Pricing Code</option>
                      <option value="costService">Cost Service</option>
                      <option value="costMaterial">Cost Material</option>
                      <option value="costMedicine">Cost Medicine</option>
                      <option value="providerCost">Provider Cost</option>
                      <option value="totalAmount">Total Amount</option>
                    </select>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className="col-sm-2 col-form-label">Condition</label>
                  <div className="col-sm-10">
                    <select className="form-select" name="conditionLabel" onChange={handleChangeCondition} value={conditionInput.conditionLabel}>
                      <option value="">Select</option>
                      <option value="0">Equal to</option>
                      <option value="1">More or equal to</option>
                      <option value="2">Less or equal to</option>
                      <option value="3">Not equal to</option>
                    </select>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className="col-sm-2 col-form-label">Value</label>
                  <div className="col-sm-10">
                    <input type="text" name='value' value={conditionInput.value} className="form-control" onChange={handleChangeCondition}/>
                  </div>
                </div>
                <div className='d-flex col-md-9 offset-md-6 mb-3'>
                  <div className='col-2 ms-2'>
                    <div className="row">
                      <button className='btn btn-secondary' onClick={handleSubmitCondition}>Add Condition</button>
                    </div>
                  </div>
                </div>
                <div className='mb-3 row'>
                  <label className="col-sm-2 col-form-label">Applied Contidions</label>
                  <div className="col-sm-10">
                    <table className="table table-bordered border-dark">
                      <thead>
                        <tr>
                          <td className='tdhead'>Field</td>
                          <td className='tdhead'>Condition</td>
                          <td className='tdhead'>Value</td>
                          <td className='p-1 ps-0 pe-0 tdbuttons'></td>
                        </tr>
                      </thead>
                      <tbody>
                        {conditionsByError && conditionsByError.length > 0 ? (
                          conditionsByError.map(condition => (
                            <tr key={condition.conditionId}>
                              <td>{condition.field}</td>
                              <td>{condition.conditionLabel == 0 ? ("Equal to") : condition.conditionLabel == 1 ? ("More or equal to"): condition.conditionLabel == 2 ? ("Less or equal to"): "Not equal to"}</td>
                              <td>{condition.value}</td>
                              <td className='p-1 ps-0 pe-0 tdbuttons'>
                                <button className='btn btn-primary ms-0 m-1 pt-0 p-1' onClick={() => handleEditCondition(condition, event)}><FaEdit/></button>
                                <button className='btn btn-danger ms-0 m-1 pt-0 p-1' onClick={() => handleDeleteCondition(condition.conditionId, condition.errorId, event)}><FaTrash/></button>
                                </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3">There is no associated condition</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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
                  <button className='btn btn-success ms-0 m-1 pt-0 p-1' onClick={() => addPayersForm(error.errorId)}><IoReceiptOutline/></button>
                  <button className='btn btn-warning ms-0 m-1 pt-0 p-1' onClick={() => addConditionForm(error.errorId)}><RiMenuLine/></button>
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