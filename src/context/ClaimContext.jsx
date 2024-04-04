import React, { createContext, useState, useEffect } from "react";

const ClaimContext = createContext();

const ClaimProvider = ({ children }) => {

    const [claim, setClaim] = useState(null);
    const [claims, setClaims] = useState([]);
    const [lastFetchTime, setLastFetchTime] = useState(null);

    useEffect(() => {
        if (!claims.length || !lastFetchTime || Date.now() - lastFetchTime > 60000)
        {
            getClaims();
        }
    }, []);

    const getClaims = async () =>
    {
        try
        {
            const response = await fetch ('https://localhost:44304/api/Claims');
            if (response.ok)
            {
                const claimsResponse = await response.text();
                setClaims(JSON.parse(claimsResponse));
                setLastFetchTime(Date.now());
            }
            else
            {
                console.error('Error al obtener los claims',);
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    }

    const getClaim = async (claimId) => 
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Claims/${claimId}`);
            if (response.ok)
            {
                const claimResponse = await response.text();
                setUser(JSON.parse(claimResponse));
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
    }

    const putClaim = async(claimId, claimData) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Claims/${claimId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(claimData)
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
                getClaims();
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }

    }

    const postClaim = async (claimData) =>
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/Claims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(claimData)
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
                const claimResponse = await response.text();
                setClaim(JSON.parse(claimResponse));
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const deleteClaim = async (claimId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Claims/${claimId}`, {method: 'DELETE'});

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
                getClaims();
                return true;
            }
        }
        catch (error)
        {
            console.log('Error:', error);
            return false;
        }
    };

    const data = { postClaim, deleteClaim, putClaim, getClaim, getClaims, claim, claims };

    return (
        <ClaimContext.Provider value={data}>
            {children}
        </ClaimContext.Provider>
    )
}

export { ClaimProvider };
export default ClaimContext;