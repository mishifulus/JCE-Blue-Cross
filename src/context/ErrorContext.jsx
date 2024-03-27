import React, { createContext, useState, useEffect } from "react";

const ErrorContext = createContext();

const ErrorProvider = ({ children }) => {

    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(null);
    const [lastFetchTime, setLastFetchTime] = useState(null);

    useEffect(() => {
        if (!errors.length || !lastFetchTime || Date.now() - lastFetchTime > 60000)
        {
            getErrors();
        }
    }, []);

    const getErrors = async () =>
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/Error');
            if (response.ok)
            {
                const errorsResponse = await response.text();
                console.log(errorsResponse);
                setErrors(JSON.parse(errorsResponse));
                setLastFetchTime(Date.now());
            }
            else
            {
                console.error('Error al obtener los errores');
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    };

    const getError = async (errorId) => 
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Error/${errorId}`);
            if (response.ok)
            {
                const errorResponse = await response.text();
                console.log(errorResponse);
                setError(JSON.parse(errorResponse));
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

    const putError = async (errorId, errorData) => 
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Error/${errorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(errorData)
            });
            if (!response.ok)
            {
                return false;
            }
            else
            {
                getErrors();
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const postError = async (errorData) => 
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/Error', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(errorData)
            });
            if (!response.ok)
            {
                return false;
            }
            else
            {
                const errorResponse = await response.text();
                console.log(errorResponse);
                setError(JSON.parse(errorResponse));
                getErrors();
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const deleteError = async (errorId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Error/${errorId}`, {
                method: 'DELETE'
            });
            if (!response.ok)
            {
                return false;
            }
            else
            {
                getErrors();

                const response = await fetch(`https://localhost:44304/api/PayorErrors/error/${errorId}`, {
                method: 'DELETE'
                });

                if(!response.ok)
                {
                    return false;
                }
                else
                {
                    const response = await fetch(`https://localhost:44304/api/Conditions/error/${errorId}`, {
                    method: 'DELETE'
                    });

                    if(!response.ok)
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
            }
        }
        catch (error)
        {
            console.log('Error:', error);
            return false;
        }
    };

    const data = { deleteError, postError, putError, getError, getErrors, error, errors };

    return (
        <ErrorContext.Provider value={data}>
            {children}
        </ErrorContext.Provider>
    )
}

export { ErrorProvider };
export default ErrorContext;