import React, { useState, useContext, useEffect } from 'react'
import "../styles/Modules.css"
import swal from "sweetalert";
import ProviderContext from '../context/ProviderContext';
import PayerContext from '../context/PayerContext';
import UserContext from '../context/UserContext';
import ClaimContext from '../context/ClaimContext';

const SubmitClaimPage = () => {

  const { postClaim, claim } = useContext(ClaimContext);
  const { getProvidersActives, providersActives } = useContext(ProviderContext);
  const { getUsersActives, usersActives, currentUser } = useContext(UserContext);
  const { getPayersActives, payersActives } = useContext(PayerContext);

  const [claimInput, setClaimInput] = useState({
    claimId: 0,
    claimNumber: "",
    entryDate: "",
    dischargeDate: "",
    entryHour: "",
    dischargeHour: "",
    institutionalClaimCode: "string",
    professionalClaimCode: "string",
    typeBill: "string",
    referalNum: "string",
    serviceCode: "string",
    authCode: "string",
    medicalRecordNumber: "string",
    payerClaimControlNumber: "string",
    autoAccidentState: "string",
    fileInf: "string",
    claimNote: "string",
    billingNote: "string",
    onsetSymptomDate: "2024-03-31T06:04:16.660Z",
    initialTreatmentDate: "2024-03-31T06:04:16.660Z",
    lastSeenDate: "2024-03-31T06:04:16.660Z",
    acuteManifestationDate: "2024-03-31T06:04:16.660Z",
    accidentDate: "2024-03-31T06:04:16.660Z",
    lastMenstrualDate: "2024-03-31T06:04:16.660Z",
    lastXRayDate: "2024-03-31T06:04:16.660Z",
    hearingVisionPrescriptionDate: "2024-03-31T06:04:16.660Z",
    disabilityDate: "2024-03-31T06:04:16.660Z",
    lastWorkedDate: "2024-03-31T06:04:16.660Z",
    authorizedReturnWorkDate: "2024-03-31T06:04:16.660Z",
    assumedCareDate: "2024-03-31T06:04:16.660Z",
    repricerReceivedDate: "2024-03-31T06:04:16.660Z",
    principalDiagnosisCode: "string",
    admitingDiagnosisCode: "string",
    patientReasonCode: "string",
    externalCausesCode: "string",
    diagnosisRelatedCode: "string",
    otherDiagnosisCode: "string",
    principalProcedureCode: "string",
    otherProcedureCode: "string",
    occurrenceSpamCode: "string",
    occurrenceInformationCode: "string",
    valueInformationCode: "string",
    conditionInformationCode: "string",
    treatmentCodeCode: "string",
    claimPricingCode: "string",
    costService: 0,
    costMaterial: 0,
    costMedicine: 0,
    providerCost: 0,
    totalAmount: 0,
    member: null,
    provider: null,
    payor: null,
    status: 1
  });

  const handleChange = (e) => {
    setClaimInput({
      ...claimInput,
      [e.target.name]: e.target.value,
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
      institutionalClaimCode: "string",
      professionalClaimCode: "string",
      typeBill: "string",
      referalNum: "string",
      serviceCode: "string",
      authCode: "string",
      medicalRecordNumber: "string",
      payerClaimControlNumber: "string",
      autoAccidentState: "string",
      fileInf: "string",
      claimNote: "string",
      billingNote: "string",
      onsetSymptomDate: "2024-03-31T06:04:16.660Z",
      initialTreatmentDate: "2024-03-31T06:04:16.660Z",
      lastSeenDate: "2024-03-31T06:04:16.660Z",
      acuteManifestationDate: "2024-03-31T06:04:16.660Z",
      accidentDate: "2024-03-31T06:04:16.660Z",
      lastMenstrualDate: "2024-03-31T06:04:16.660Z",
      lastXRayDate: "2024-03-31T06:04:16.660Z",
      hearingVisionPrescriptionDate: "2024-03-31T06:04:16.660Z",
      disabilityDate: "2024-03-31T06:04:16.660Z",
      lastWorkedDate: "2024-03-31T06:04:16.660Z",
      authorizedReturnWorkDate: "2024-03-31T06:04:16.660Z",
      assumedCareDate: "2024-03-31T06:04:16.660Z",
      repricerReceivedDate: "2024-03-31T06:04:16.660Z",
      principalDiagnosisCode: "string",
      admitingDiagnosisCode: "string",
      patientReasonCode: "string",
      externalCausesCode: "string",
      diagnosisRelatedCode: "string",
      otherDiagnosisCode: "string",
      principalProcedureCode: "string",
      otherProcedureCode: "string",
      occurrenceSpamCode: "string",
      occurrenceInformationCode: "string",
      valueInformationCode: "string",
      conditionInformationCode: "string",
      treatmentCodeCode: "string",
      claimPricingCode: "string",
      costService: 0,
      costMaterial: 0,
      costMedicine: 0,
      providerCost: 0,
      totalAmount: 0,
      member: null,
      provider: null,
      payor: null,
      status: 1
    });
  };

  const handleSubmit = async () => {
    postClaim(claimInput);
    swal(
      `Claim saved`,
      "Register",
      "success"
    );
    await fetchData();
    handleReset();
  }

  useEffect(() => {
    const fetchData = async () => {
      try
      {
        const lastFetchTime = localStorage.getItem('lastFetchTime');
        const currentTime = new Date().getTime();
        if (!lastFetchTime || (currentTime - parseInt(lastFetchTime)) > 60000) {
          await getUsersActives();
          await getPayersActives();
          await getProvidersActives();
          localStorage.setItem('lastFetchTime', currentTime.toString());
        }
      }
      catch (error)
      {
        console.error('Error al obtener usuarios, payers y providers:', error);
      }
    };
    fetchData();
  }, [getUsersActives, getPayersActives, getProvidersActives]);

  return (
    <div className='container' style={{  maxHeight: '80vh' }}>
      <div className='row container'>
        <div className='col-3 header'>
          <h3 className='ms-4 mb-4 text-decoration-underline'>Claim Submit</h3>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label mt-2">Member</label>
                <div className="col-sm-10">
                  <select className="form-select mt-2" name="member">
                    <option value="">Select</option>
                    {usersActives.map(user => (
                    <option key={user.userId} value={user.userId}>{user.userId} - {user.name} {user.lastName} </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label mt-2">Provider</label>
                <div className="col-sm-10">
                  <select className="form-select mt-2" name="provider">
                    <option value="">Select</option>
                    {providersActives.map(provider => (
                    <option key={provider.providerId} value={provider.providerId}>{provider.providerId} - {provider.providerName} ({provider.providerAddress}) </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='mb-3 row'>
                <label className="col-sm-2 col-form-label mt-2">Payer</label>
                <div className="col-sm-10">
                  <select className="form-select mt-2" name="payor">
                    <option value="">Select</option>
                    {payersActives.map(payer => (
                    <option key={payer.payorId} value={payer.payorId}>{payer.payorId} - {payer.payorName} ({payer.payorAddress}) </option>
                    ))}
                  </select>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitClaimPage