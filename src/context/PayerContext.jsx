import React, { createContext, useState, useEffect } from "react";

const PayerContext = createContext();

const PayerProvider = ({ children }) => {

    const [payers, setPayers] = useState([]);
    const [payer, setPayer] = useState(null);
    const [payersActives, setPayersActives] = useState([]);
    const [lastFetchTime, setLastFetchTime] = useState(null);

    useEffect(() => {
        if (!payers.length || !lastFetchTime || Date.now() - lastFetchTime > 60000)
        {
            getPayers();
        }
    }, []);

    const getPayers = async () =>
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/Payor');
            if (response.ok)
            {
                const payersResponse = await response.text();
                setPayers(JSON.parse(payersResponse));
                setLastFetchTime(Date.now());
            }
            else
            {
                console.error('Error al obtener los payers');
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    };

    const getPayersActives = async () =>
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/Payor/active');
            if (response.ok)
            {
                const payersResponse = await response.text();
                setPayersActives(JSON.parse(payersResponse));
                setLastFetchTime(Date.now());
            }
            else
            {
                console.error('Error al obtener los payers activos');
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    };

    const getPayer = async (payorId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Payor/${payorId}`);
            if (response.ok)
            {
                const payerResponse = await response.text();
                setPayer(JSON.parse(payerResponse));
                return true;
            }
            else
            {
                return false;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const putPayer = async(payorId, payorData) => 
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Payor/${payorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payorData)
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
                getPayers();
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const postPayer = async (payorData) =>
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/Payor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payorData)
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
                const payerResponse = await response.text();
                setPayer(JSON.parse(payerResponse));
                getPayers();
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const deletePayer = async (payorId) => 
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Payor/${payorId}`, {
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
                getPayers();
                return true;
            }
        }
        catch (error)
        {
            console.log('Error:', error);
            return false;
        }
    };

    const data = { deletePayer, postPayer, putPayer, getPayer, getPayers, payer, payers, payersActives, getPayersActives };
    
    return(
        <PayerContext.Provider value={data}>
            {children}
        </PayerContext.Provider>
    )
}

export { PayerProvider };
export default PayerContext;
