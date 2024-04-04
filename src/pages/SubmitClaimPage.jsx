import React, { useState, useContext, useEffect } from 'react'
import "../styles/Modules.css"
import swal from "sweetalert";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BiShow } from 'react-icons/bi';
import ProviderContext from '../context/ProviderContext';
import PayerContext from '../context/PayerContext';
import UserContext from '../context/UserContext';
import ClaimContext from '../context/ClaimContext';

const SubmitClaimPage = () => {

  const { postClaim, deleteClaim, putClaim, getClaim, getClaims, claim, claims } = useContext(ClaimContext);
  const { getProvidersActives, providersActives } = useContext(ProviderContext);
  const { getUsersActives, usersActives } = useContext(UserContext);
  const { getPayersActives, payersActives } = useContext(PayerContext);
  const [loading, setLoading] = useState(true);

  const [claimInput, setClaimInput] = useState({
    claimId: 0,
    claimNumber: "",
    entryDate: "",
    dischargeDate: "",
    entryHour: "",
    dischargeHour: "",
    institutionalClaimCode: "",
    professionalClaimCode: "",
    typeBill: "",
    referalNum: "",
    serviceCode: "",
    authCode: "",
    medicalRecordNumber: "",
    payerClaimControlNumber: "",
    autoAccidentState: "",
    fileInf: "",
    claimNote: "",
    billingNote: "",
    onsetSymptomDate: "",
    initialTreatmentDate: "",
    lastSeenDate: "",
    acuteManifestationDate: "",
    accidentDate: "",
    lastMenstrualDate: "",
    lastXRayDate: "",
    hearingVisionPrescriptionDate: "",
    disabilityDate: "",
    lastWorkedDate: "",
    authorizedReturnWorkDate: "",
    assumedCareDate: "",
    repricerReceivedDate: "",
    principalDiagnosisCode: "",
    admitingDiagnosisCode: "",
    patientReasonCode: "",
    externalCausesCode: "",
    diagnosisRelatedCode: "",
    otherDiagnosisCode: "",
    principalProcedureCode: "",
    otherProcedureCode: "",
    occurrenceSpamCode: "",
    occurrenceInformationCode: "",
    valueInformationCode: "",
    conditionInformationCode: "",
    treatmentCodeCode: "",
    claimPricingCode: "",
    costService: 0,
    costMaterial: 0,
    costMedicine: 0,
    providerCost: 0,
    totalAmount: 0,
    memberUserId: 0,
    providerId: 0,
    payorId: 0,
    status: 1
  });

  const handleChange = (e) => {
    setClaimInput({
      ...claimInput,
      [e.target.name]: e.target.value,
    });

    const total = parseFloat(claimInput.costService) + parseFloat(claimInput.costMaterial) + parseFloat(claimInput.costMedicine) + parseFloat(claimInput.providerCost);
    const roundedTotal = total.toFixed(2);
    setClaimInput({
      ...claimInput,
      [e.target.name]: e.target.value,
      totalAmount: roundedTotal
    });
  };

  const handleReset = () => {
    setClaimInput({
      claimId: 0,
      claimNumber: "",
      entryDate: "",
      dischargeDate: "",
      entryHour: "",
      dischargeHour: "",
      institutionalClaimCode: "",
      professionalClaimCode: "",
      typeBill: "",
      referalNum: "",
      serviceCode: "",
      authCode: "",
      medicalRecordNumber: "",
      payerClaimControlNumber: "",
      autoAccidentState: "",
      fileInf: "",
      claimNote: "",
      billingNote: "",
      onsetSymptomDate: "",
      initialTreatmentDate: "",
      lastSeenDate: "",
      acuteManifestationDate: "",
      accidentDate: "",
      lastMenstrualDate: "",
      lastXRayDate: "",
      hearingVisionPrescriptionDate: "",
      disabilityDate: "",
      lastWorkedDate: "",
      authorizedReturnWorkDate: "",
      assumedCareDate: "",
      repricerReceivedDate: "",
      principalDiagnosisCode: "",
      admitingDiagnosisCode: "",
      patientReasonCode: "",
      externalCausesCode: "",
      diagnosisRelatedCode: "",
      otherDiagnosisCode: "",
      principalProcedureCode: "",
      otherProcedureCode: "",
      occurrenceSpamCode: "",
      occurrenceInformationCode: "",
      valueInformationCode: "",
      conditionInformationCode: "",
      treatmentCodeCode: "",
      claimPricingCode: "",
      costService: 0,
      costMaterial: 0,
      costMedicine: 0,
      providerCost: 0,
      totalAmount: 0,
      memberUserId: 0,
      providerId: 0,
      payorId: 0,
      status: 1
    });
  };

  const handleSubmit = async () => {
    if (claimInput.claimNumber == "")
    {
      swal(
        `There are empty required fields`,
        "Register",
        "warning"
      );
    }
    else
    {
      claimInput.entryHour = `${claimInput.entryHour}:00`
      claimInput.dischargeHour = `${claimInput.dischargeHour}:00`

      if (claimInput.claimId)
      {
        try
        {
          var result = await putClaim(claimInput.claimId, claimInput);
          if (result)
          {
            swal(
              `Claim saved`,
              "Register",
              "success"
            );
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
        catch
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
        try
        {
          var result = await postClaim(claimInput);
          if (result)
          {
            swal(
              `Claim saved`,
              "Register",
              "success"
            );
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
        catch
        {
          swal(
            `ERROR`,
            "Register",
            "error"
          );
        }
      }
      await getClaims();
      handleReset();
    }
  }

  const handleDelete = async (id) => {
    var result = await deleteClaim(id);

    if (result)
    {
      swal(
        `Claim deleted`,
        "Delete",
        "success"
      );
      await getClaims();
    }
    else
    {
      swal(
        `Error`,
        "Delete",
        "error"
      );
    }
  }

  const handleEdit = (claim) => {
    setClaimInput({
      ...claim,
      entryDate: claim.entryDate ? formatDate(claim.entryDate) : "",
      dischargeDate: claim.dischargeDate ? formatDate(claim.dischargeDate) : "",

      onsetSymptomDate: claim.onsetSymptomDate ? formatDate(claim.onsetSymptomDate) : "",
      initialTreatmentDate: claim.initialTreatmentDate ? formatDate(claim.initialTreatmentDate) : "",
      lastSeenDate: claim.lastSeenDate ? formatDate(claim.lastSeenDate) : "",
      acuteManifestationDate: claim.acuteManifestationDate ? formatDate(claim.acuteManifestationDate) : "",
      accidentDate: claim.accidentDate ? formatDate(claim.accidentDate) : "",
      lastMenstrualDate: claim.lastMenstrualDate ? formatDate(claim.lastMenstrualDate) : "",
      lastXRayDate: claim.lastXRayDate ? formatDate(claim.lastXRayDate) : "",
      hearingVisionPrescriptionDate: claim.hearingVisionPrescriptionDate ? formatDate(claim.hearingVisionPrescriptionDate) : "",
      disabilityDate: claim.disabilityDate ? formatDate(claim.disabilityDate) : "",
      lastWorkedDate: claim.lastWorkedDate ? formatDate(claim.lastWorkedDate) : "",
      authorizedReturnWorkDate: claim.authorizedReturnWorkDate ? formatDate(claim.authorizedReturnWorkDate) : "",
      assumedCareDate: claim.assumedCareDate ? formatDate(claim.assumedCareDate) : "",
      repricerReceivedDate: claim.repricerReceivedDate ? formatDate(claim.repricerReceivedDate) : "",

      entryHour: claim.entryHour ? formatHour(claim.entryHour) : "",
      dischargeHour: claim.dischargeHour ? formatHour(claim.dischargeHour) : "",
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        await getClaims();
        await getUsersActives();
        await getPayersActives();
        await getProvidersActives();
      }
      catch (error)
      {
        console.error('Error al obtener usuarios, payers y providers:', error);
      }
      finally
      {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return dateString.slice(0, 10);
  }

  const formatHour = (hourString) => {
    return hourString.slice(0,5);
  }

  return (
    <div className='container' style={{  maxHeight: '80vh' }}>
      <div className='row container'>
        <div className='col-3 header'>
          <h3 className='ms-4 mb-4 text-decoration-underline'>Claim Submit</h3>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 offset-md-1'>
              <div className='col-3'>
                <h5 className='ms-4 mb-4 text-decoration-underline'>Member Information</h5>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label mt-2 fw-bolder text-end">Member</label>
                <div className="col-sm-10">
                  <select className="form-select mt-2" name="memberUserId" onChange={handleChange} required value={claimInput.memberUserId}>
                    <option value="">Select</option>
                    {usersActives.map(user => (
                    <option key={user.userId} value={user.userId}>{user.userId} - {user.name} {user.lastName}, {user.sex === 0 ? ("Male"): user.sex === 1 ? ("Female"): user.sex === 2 ? ("Other"):null } {formatDate(user.dob)} ({user.userAddress}, {user.zipCode} {user.state}, {user.city}) </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-3'>
                <h5 className='ms-4 mb-4 mt-5 text-decoration-underline'>Payer Information</h5>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label mt-2 fw-bolder text-end">Payer</label>
                <div className="col-sm-10">
                  <select className="form-select mt-2" name="payorId" onChange={handleChange} required value={claimInput.payorId}>
                    <option value="">Select</option>
                    {payersActives.map(payer => (
                    <option key={payer.payorId} value={payer.payorId}>{payer.payorId} - {payer.payorName} ({payer.payorAddress}, {payer.zipCode} {payer.state}, {payer.city}) </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-3'>
                <h5 className='ms-4 mb-4 mt-5 text-decoration-underline'>Provider Information</h5>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label mt-2 fw-bolder text-end">Provider</label>
                <div className="col-sm-10">
                  <select className="form-select mt-2" name="providerId" onChange={handleChange} required value={claimInput.providerId}>
                    <option value="">Select</option>
                    {providersActives.map(provider => (
                    <option key={provider.providerId} value={provider.providerId}>{provider.providerId} - {provider.providerName} ({provider.providerAddress}, {provider.zipCode} {provider.state}, {provider.city}) </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col-3'>
                <h5 className='ms-4 mb-4 mt-5 text-decoration-underline'>Claim Information</h5>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label text-end">ID</label>
                    <div className="col-sm-8">
                      <input type="text" name='claimId' value={claimInput.claimId} onChange={handleChange} className="form-control" disabled/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-1 text-end">Claim Number</label>
                    <div className="col-sm-8">
                      <input type="text" name='claimNumber' value={claimInput.claimNumber} onChange={handleChange} className="form-control" maxLength={10} required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-1 text-end">Entry Date</label>
                    <div className="col-sm-8">
                    <input type="date" name='entryDate' value={claimInput.entryDate} onChange={handleChange} className="form-control date" minLength={10} maxLength={10} required/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end mt-1">Discharge Date</label>
                    <div className="col-sm-8">
                      <input type="date" name='dischargeDate' value={claimInput.dischargeDate} onChange={handleChange} className="form-control" minLength={10} maxLength={10} required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-1 text-end">Entry Hour</label>
                    <div className="col-sm-8">
                      <input type="time" name='entryHour' value={claimInput.entryHour} onChange={handleChange} className="form-control" required/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end mt-1">Discharge Hour</label>
                    <div className="col-sm-8">
                      <input type="time" name='dischargeHour' value={claimInput.dischargeHour} onChange={handleChange} className="form-control" required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Institutional Claim Code</label>
                    <div className="col-sm-8">
                      <input type="text" name='institutionalClaimCode' value={claimInput.institutionalClaimCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end">Professional Claim Code</label>
                    <div className="col-sm-8">
                      <input type="text" name='professionalClaimCode' value={claimInput.professionalClaimCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-1 text-end">Type of Bill</label>
                    <div className="col-sm-8">
                      <input type="text" name='typeBill' value={claimInput.typeBill} onChange={handleChange} className="form-control" maxLength={10} required/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end mt-1">Referal Num</label>
                    <div className="col-sm-8">
                      <input type="text" name='referalNum' value={claimInput.referalNum} onChange={handleChange} className="form-control" maxLength={10} required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end mt-1">Service Code</label>
                    <div className="col-sm-8">
                      <input type="text" name='serviceCode' value={claimInput.serviceCode} onChange={handleChange} className="form-control" maxLength={10} required/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-1 text-end">Auth Code</label>
                    <div className="col-sm-8">
                      <input type="text" name='authCode' value={claimInput.authCode} onChange={handleChange} className="form-control" maxLength={10} required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Medical Record Number</label>
                    <div className="col-sm-8">
                      <input type="text" name='medicalRecordNumber' value={claimInput.medicalRecordNumber} onChange={handleChange} className="form-control mt-1" maxLength={10} required/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Payer Claim Control Number</label>
                    <div className="col-sm-8">
                      <input type="text" name='payerClaimControlNumber' value={claimInput.payerClaimControlNumber} onChange={handleChange} className="form-control mt-1" maxLength={10} required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Auto Accident State</label>
                    <div className="col-sm-8">
                      <input type="text" name='autoAccidentState' value={claimInput.autoAccidentState} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-1 text-end mt-1">File Inf</label>
                    <div className="col-sm-8">
                      <input type="text" name='fileInf' value={claimInput.fileInf} onChange={handleChange} className="form-control" maxLength={10} required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-2 col-form-label p-0 text-end mt-4">Claim Note</label>
                    <div className="col-sm-9">
                      <textarea className="form-control" name='claimNote' value={claimInput.claimNote} onChange={handleChange} rows="3" minLength={1}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-2 col-form-label p-0 text-end mt-4">Billing Note</label>
                    <div className="col-sm-9">
                      <textarea className="form-control" name='billingNote' value={claimInput.billingNote} onChange={handleChange} rows="3" minLength={1}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-3'>
                <h5 className='ms-4 mb-4 mt-5 text-decoration-underline'>Diagnostic Dates</h5>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Onset of Symptom</label>
                    <div className="col-sm-3">
                      <input type="date" name='onsetSymptomDate' value={claimInput.onsetSymptomDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Initial Treatment</label>
                    <div className="col-sm-3">
                      <input type="date" name='initialTreatmentDate' value={claimInput.initialTreatmentDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Last Seen Date</label>
                    <div className="col-sm-3">
                      <input type="date" name='lastSeenDate' value={claimInput.lastSeenDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Acute Manifestation</label>
                    <div className="col-sm-3">
                      <input type="date" name='acuteManifestationDate' value={claimInput.acuteManifestationDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Accident</label>
                    <div className="col-sm-3">
                      <input type="date" name='accidentDate' value={claimInput.accidentDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Last Menstrual Date</label>
                    <div className="col-sm-3">
                      <input type="date" name='lastMenstrualDate' value={claimInput.lastMenstrualDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Last X-Ray</label>
                    <div className="col-sm-3">
                      <input type="date" name='lastXRayDate' value={claimInput.lastXRayDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Hearing / Vision Prescription</label>
                    <div className="col-sm-3">
                      <input type="date" name='hearingVisionPrescriptionDate' value={claimInput.hearingVisionPrescriptionDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Disability Date</label>
                    <div className="col-sm-3">
                      <input type="date" name='disabilityDate' value={claimInput.disabilityDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Last Worked</label>
                    <div className="col-sm-3">
                      <input type="date" name='lastWorkedDate' value={claimInput.lastWorkedDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Authorized Return Work</label>
                    <div className="col-sm-3">
                      <input type="date" name='authorizedReturnWorkDate' value={claimInput.authorizedReturnWorkDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Assumed and Relinquished Care</label>
                    <div className="col-sm-3">
                      <input type="date" name='assumedCareDate' value={claimInput.assumedCareDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-3'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Repricer Received Date</label>
                    <div className="col-sm-3">
                      <input type="date" name='repricerReceivedDate' value={claimInput.repricerReceivedDate} onChange={handleChange} className="form-control" maxLength={10} minLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-3'>
                <h5 className='ms-4 mb-4 mt-5 text-decoration-underline'>Diagnostic Codes</h5>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Principal Diagnosis</label>
                    <div className="col-sm-8">
                      <input type="text" name='principalDiagnosisCode' value={claimInput.principalDiagnosisCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end">Admiting Diagnosis</label>
                    <div className="col-sm-8">
                      <input type="text" name='admitingDiagnosisCode' value={claimInput.admitingDiagnosisCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Patient Reason For Visit</label>
                    <div className="col-sm-8">
                      <input type="text" name='patientReasonCode' value={claimInput.patientReasonCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end">External Causes of Injury</label>
                    <div className="col-sm-8">
                      <input type="text" name='externalCausesCode' value={claimInput.externalCausesCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Diagnosis Related Group</label>
                    <div className="col-sm-8">
                      <input type="text" name='diagnosisRelatedCode' value={claimInput.diagnosisRelatedCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end">Other Diagnosis Information</label>
                    <div className="col-sm-8">
                      <input type="text" name='otherDiagnosisCode' value={claimInput.otherDiagnosisCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Principal Procedure Inf</label>
                    <div className="col-sm-8">
                      <input type="text" name='principalProcedureCode' value={claimInput.principalProcedureCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end">Other Procedure Information</label>
                    <div className="col-sm-8">
                      <input type="text" name='otherProcedureCode' value={claimInput.otherProcedureCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Occurrence Spam Info</label>
                    <div className="col-sm-8">
                      <input type="text" name='occurrenceSpamCode' value={claimInput.occurrenceSpamCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end">Occurrence Information</label>
                    <div className="col-sm-8">
                      <input type="text" name='occurrenceInformationCode' value={claimInput.occurrenceInformationCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Value Information</label>
                    <div className="col-sm-8">
                      <input type="text" name='valueInformationCode' value={claimInput.valueInformationCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end">Condition Information</label>
                    <div className="col-sm-8">
                      <input type="text" name='conditionInformationCode' value={claimInput.conditionInformationCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-1'>
                <div className='col-md-6'>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 text-end">Treatment Code Info</label>
                    <div className="col-sm-8">
                      <input type="text" name='treatmentCodeCode' value={claimInput.treatmentCodeCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='mb-3 row'>
                    <label className="col-sm-3 col-form-label p-0 mt-0 text-end">Claim Pricing Information</label>
                    <div className="col-sm-8">
                      <input type="text" name='claimPricingCode' value={claimInput.claimPricingCode} onChange={handleChange} className="form-control mt-1" maxLength={10}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-3'>
                <h5 className='ms-4 mb-4 mt-5 text-decoration-underline'>Costs</h5>
              </div>
              <div className='row d-flex offset-md-6'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Cost for Service</label>
                    <div className="col-sm-5">
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">$</span>
                        <input type="number" className="form-control" name='costService' value={claimInput.costService} onChange={handleChange} min={1} step="0.01" required/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-6'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Cost of Material</label>
                    <div className="col-sm-5">
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">$</span>
                        <input type="number" className="form-control" name='costMaterial' value={claimInput.costMaterial} onChange={handleChange} min={1} step="0.01" required/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-6'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Cost of Medicine</label>
                    <div className="col-sm-5">
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">$</span>
                        <input type="number" className="form-control" name='costMedicine' value={claimInput.costMedicine} onChange={handleChange} min={1} step="0.01" required/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-6'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end">Provider Cost</label>
                    <div className="col-sm-5">
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">$</span>
                        <input type="number" className="form-control" name='providerCost' value={claimInput.providerCost} onChange={handleChange} min={1} step="0.01" required/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-flex offset-md-6 mb-5'>
                <div className='col-md-12'>
                  <div className='mb-3 row'>
                    <label className="col-sm-4 col-form-label p-0 mt-2 text-end fw-medium">TOTAL AMOUNT</label>
                    <div className="col-sm-5">
                      <div className="input-group">
                        <span className="input-group-text btn-static" id="basic-addon1">$</span>
                        <input type="number" className="form-control fw-medium" name='totalAmount' value={claimInput.totalAmount} onChange={handleChange} min={1} step="0.01" required disabled/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {claimInput.status === 1 ? (
                <div className='d-flex col-md-6 offset-md-5 mb-4'>
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
              ):null}
          </div>
        </div>
      </div>
      <div className='col-10 tableModule'>
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <td className='tdhead'>ID</td>
              <td className='tdhead'>Claim Number</td>
              <td className='tdhead'>Entry</td>
              <td className='tdhead'>Discharge</td>
              <td className='tdhead'>Referal Num</td>
              <td className='tdhead'>Service Code</td>
              <td className='tdhead'>Auth Code</td>
              <td className='tdhead'>Medical Record Num</td>
              <td className='tdhead'>Member ID</td>
              <td className='tdhead'>Payer ID</td>
              <td className='tdhead'>Provider ID</td>
              <td className='tdhead'>Total</td>
              <td className='tdhead'>Status</td>
              <td className='tdhead tdbuttons'></td>
            </tr>
          </thead>
          <tbody>
          {loading ? (
            <tr>
              <td colSpan={"13"}>Loading...</td>
            </tr> 
          ) : claims.map(claim => (
            <tr key={claim.claimId}>
              <td>{claim.claimId}</td>
              <td>{claim.claimNumber}</td>
              <td>{formatDate(claim.entryDate)}</td>
              <td>{formatDate(claim.dischargeDate)}</td>
              <td>{claim.referalNum}</td>
              <td>{claim.serviceCode}</td>
              <td>{claim.authCode}</td>
              <td>{claim.medicalRecordNumber}</td>
              <td>{claim.memberUserId}</td>
              <td>{claim.providerId}</td>
              <td>{claim.payorId}</td>
              <td>${claim.totalAmount}</td>
              <td>{claim.status == 0 ? ("Cancelado") : "Enviado"}</td>
              <td className='p-1 ps-0 pe-0 tdbuttons'>
                {claim.status === 1 ? (
                  <>
                  <button className='btn btn-danger ms-0 m-1 pt-0 p-1' onClick={() => handleDelete(claim.claimId)}><FaTrash/></button>
                  <button className='btn btn-primary m-1 pt-0 p-1' onClick={() => handleEdit(claim)}><FaEdit/></button>
                  </>
                ): 
                <button className='btn btn-static m-1 pt-0 p-1' onClick={() => handleEdit(claim)}><BiShow/></button>
                }
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

export default SubmitClaimPage