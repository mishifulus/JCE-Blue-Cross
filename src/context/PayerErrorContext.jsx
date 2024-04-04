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

                if (payorsResponse.trim() !== "")
                {
                    setPayerErrorsByError(JSON.parse(payorsResponse));
                }
                else
                {
                    setPayerErrorsByError([]);
                }
            }
            else
            {
                console.error(`Error al obtener los payers por error: ${response.status} - ${response.statusText}`);
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    };

    // VER ERRORES POR PAYOR

    const postPayorError = async (errorId, payorId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/PayorErrors?errorId=${errorId}&payorId=${payorId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: ''
            });

            if (response.status === 400)
            {
                return false;
            }
            else if (!response.ok)
            {
                return false;
            }
            else
            {
                const payerErrorResponse = await response.text();
                setPayerError(JSON.parse(payerErrorResponse));
                await getPayorErrorsByError(errorId);
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const deletePayerError = async (errorId, payorId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/PayorErrors/error/${errorId}/payor/${payorId}`, {
                method: 'DELETE'
            });

            if (response.status === 400)
            {
                return false;
            }
            else if (!response.ok)
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