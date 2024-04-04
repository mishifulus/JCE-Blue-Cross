import React, { createContext, useState, useEffect } from "react";

const ConditionContext = createContext();

const ConditionProvider = ({ children }) => {

    const [conditionsByError, setConditionsByError] = useState([]);
    const [condition, setCondition] = useState(null);

    const getConditionsByError = async (errorId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Conditions/error/${errorId}`);
            if(response.ok)
            {
                const conditionsResponse = await response.text();

                if (conditionsResponse.trim() !== "")
                {
                    setConditionsByError(JSON.parse(conditionsResponse));
                }
                else
                {
                    setConditionsByError([]);
                }
                
            }
            else
            {
                console.error("Error al obtener las condiciones por error");
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    };

    const putCondition = async (conditionId, conditionData, errorId) => 
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Conditions/${conditionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(conditionData)
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
                getConditionsByError(errorId);
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const postCondition = async (conditionData, errorId) => 
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/Conditions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(conditionData)
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
                const conditionResponse = await response.text();
                setCondition(JSON.parse(conditionResponse));
                getConditionsByError(errorId);
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const deleteCondition = async (conditionId, errorId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Conditions/${conditionId}`, {
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
                getConditionsByError(errorId);
                return true;
            }
        }
        catch (error)
        {
            console.log('Error:', error);
            return false;
        }
    };

    const data = { deleteCondition, postCondition, putCondition, getConditionsByError, condition, conditionsByError };

    return (
        <ConditionContext.Provider value={data}>
            {children}
        </ConditionContext.Provider>
    )
}

export { ConditionProvider };
export default ConditionContext;