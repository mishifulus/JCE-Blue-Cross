import React, { createContext, useState, useEffect } from "react";

const ClaimContext = createContext();

const ClaimProvider = ({ children }) => {

    const [claim, setClaim] = useState(null);

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
            if (!response.ok)
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

    const data = { postClaim, claim };

    return (
        <ClaimContext.Provider value={data}>
            {children}
        </ClaimContext.Provider>
    )
}

export { ClaimProvider };
export default ClaimContext;