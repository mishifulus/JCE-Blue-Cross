import React, { createContext, useState, useEffect } from "react";

const ProviderContext = createContext();

const ProviderProvider = ({ children }) => {

    const [providers, setProviders] = useState([]);
    const [provider, setProvider] = useState(null);
    const [providersActives, setProvidersActives] = useState([]);
    const [lastFetchTime, setLastFetchTime] = useState(null);

    useEffect(() => {
        if (!providers.length || !lastFetchTime || Date.now() - lastFetchTime > 60000)
        {
            getProviders();
        }
    }, []);

    const getProviders = async () =>
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/Provider');
            if (response.ok)
            {
                const providersResponse = await response.text();
                setProviders(JSON.parse(providersResponse));
                setLastFetchTime(Date.now());
            }
            else
            {
                console.error('Error al obtener los providers');
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    };

    const getProvidersActives = async () =>
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/Provider/active');
            if (response.ok)
            {
                const providersResponse = await response.text();
                setProvidersActives(JSON.parse(providersResponse));
                setLastFetchTime(Date.now());
            }
            else
            {
                console.error('Error al obtener los providers');
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    };

    const getProvider = async (providerId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Provider/${providerId}`);
            if (response.ok)
            {
                const providerResponse = await response.text();
                setProvider(JSON.parse(providerResponse));
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

    const putProvider = async(providerId, providerData) => 
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Provider/${providerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(providerData)
            });
            if (!response.ok)
            {
                return false;
            }
            else
            {
                getProviders();
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const postProvider = async (providerData) =>
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/Provider', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(providerData)
            });
            if (!response.ok)
            {
                return false;
            }
            else
            {
                const providerResponse = await response.text();
                setProvider(JSON.parse(providerResponse));
                getProviders();
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    };

    const deleteProvider = async (providerId) => 
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/Provider/${providerId}`, {
                method: 'DELETE'
            });
            if (!response.ok)
            {
                return false;
            }
            else
            {
                getProviders();
                return true;
            }
        }
        catch (error)
        {
            console.log('Error:', error);
            return false;
        }
    };

    const data = { deleteProvider, postProvider, putProvider, getProvider, getProviders, provider, providers, providersActives, getProvidersActives};

    return (
        <ProviderContext.Provider value={data}>
            {children}
        </ProviderContext.Provider>
    )
}

export { ProviderProvider };
export default ProviderContext;