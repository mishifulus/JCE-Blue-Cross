import React, { createContext, useState, useEffect } from "react";

const PayerErrorContext = createContext();

const PayerErrorProvider = ({ children }) =>
{
    const [payerErrorsByError, setPayerErrorsByError] = useState([]);
    const [payerError, setPayerError] = useState(null);

    const getPayorErrorsByError = async (errorId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/PayorErrors/error/${errorId}`);
            if(response.ok)
            {
                const payorsResponse = await response.text();
                console.log(payorsResponse);
                setPayerErrorsByError(JSON.parse(payorsResponse));
            }
            else
            {
                console.error("Error al obtener los payers por error");
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    };

    // VER ERRORES POR PAYOR

    const postPayorError = async (payorErrorData, errorId) =>
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/PayorErrors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payorErrorData)
            });

            if (!response.ok)
            {
                return false;
            }
            else
            {
                const payerErrorResponse = await response.text();
                console.log(payerErrorResponse);
                setPayerError(JSON.parse(payerErrorResponse));
                getPayorErrorsByError(errorId);
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const deletePayerError = async (payorErrorId, errorId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/PayorErrors/${payorErrorId}`, {
                method: 'DELETE'
            });

            if (!response.ok)
            {
                return false;
            }
            else
            {
                getPayorErrorsByError(errorId);
                return true;
            }
        }
        catch (error)
        {
            console.log('Error:', error);
            return false;
        }
    };

    const data = { deletePayerError, postPayorError, getPayorErrorsByError, payerErrorsByError, payerError };

    return (
        <PayerErrorContext.Provider value={data}>
            {children}
        </PayerErrorContext.Provider>
    )
}

export { PayerErrorProvider };
export default PayerErrorContext;