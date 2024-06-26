import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [usersActives, setUsersActives] = useState([]);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [lastFetchTime, setLastFetchTime] = useState(null);

    useEffect(() => {
        if (!users.length || !lastFetchTime || Date.now() - lastFetchTime > 60000)
        {
            getUsers();
        }
    }, []);

    const login = async ( username, password ) => {

        if (username == null || password == null || username == '' || password == '' )
        {
            setCurrentUser(null);
            return 0;
        }

        try
        {
            const response = await fetch(`https://localhost:44304/login?username=${username}&password=${password}`, {
                method: 'POST'
            });

            //console.log(response);

            if (response.ok)
            {
                const userData = await response.text();
                console.log(userData);
                setCurrentUser(JSON.parse(userData));
                setLoginAttempts(0);
                return 1;

                // If user status is 1 -> Change password
            }
            else
            {
                const error = await response.text();
                console.log(error);
                setCurrentUser(null);

                switch (error) {
                    case 'Incorrect username':
                      return 3;
                    case 'Incorrect password':
                        setLoginAttempts(prevAttempts => prevAttempts + 1);
                        if (loginAttempts + 1 >= 3)
                        {
                            blockUser(username);
                            return 6;
                        }
                      return 4;
                    case 'User expired':
                      return 5;
                    case 'User blocked':
                      return 6;
                    default:
                      return 2;
                  }
            }
        }
        catch (error)
        {
            console.error('ERROR: ', error);
            setCurrentUser(null);
            return 0;
        }
    } // 0: EMPTY FIELDS, 1: CORRECT LOGIN, 2: ERROR, 3: USERNAME, 4: PASSWORD, 5: EXPIRED, 6: BLOCKED

    const logout = () => {
        setCurrentUser(null);
    }

    const blockUser = async (username) =>
    {
        try
        {
            const response = await fetch (`https://localhost:44304/block/${username}`, {
                method: 'PUT'
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
                console.log(`User ${username} blocked.`);
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }
    }


    //CRUD
    const getUsers = async () =>
    {
        try
        {
            const response = await fetch ('https://localhost:44304/api/User');
            if (response.ok)
            {
                const usersResponse = await response.text();
                setUsers(JSON.parse(usersResponse));
                setLastFetchTime(Date.now());
            }
            else
            {
                console.error('Error al obtener los usuarios',);
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    }

    const getUsersActives = async () =>
    {
        try
        {
            const response = await fetch ('https://localhost:44304/api/User/active');
            if (response.ok)
            {
                const usersResponse = await response.text();
                setUsersActives(JSON.parse(usersResponse));
                setLastFetchTime(Date.now());
            }
            else
            {
                console.error('Error al obtener los usuarios activos',);
            }
        }
        catch (error)
        {
            console.error('Error:', error);
        }
    }

    const getUser = async (userId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/User/${userId}`);
            if (response.ok)
            {
                const userResponse = await response.text();
                console.log(userResponse);
                setUser(JSON.parse(userResponse));
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

    const putUser = async(userId, userData) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/User/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
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
                getUsers();
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }

    }

    const postUser = async (userData) =>
    {
        try
        {
            const response = await fetch('https://localhost:44304/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
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
                const userResponse = await response.text();
                setUser(JSON.parse(userResponse));
                getUsers();
                return true;
            }
        }
        catch (error)
        {
            console.error('Error:', error);
            return false;
        }

    }

    const deleteUser = async (userId) =>
    {
        try
        {
            const response = await fetch(`https://localhost:44304/api/User/${userId}`, {method: 'DELETE'});

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
                getUsers();
                return true;
            }
        }
        catch (error)
        {
            console.log('Error:', error);
            return false;
        }
    };


    const data = { currentUser, login, logout, deleteUser, postUser, putUser, getUser, getUsers, user, users, usersActives, getUsersActives };

    return(
        <UserContext.Provider value = {data}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider };
export default UserContext;