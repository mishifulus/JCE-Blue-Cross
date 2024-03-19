import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);

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
                return 1;
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

    //CRUD
    const getUsers = () => {

    }

    const getUser = () => {

    }

    const putUser = () => {

    }

    const postUser = () => {

    }

    const deleteUser = () => {

    }


    const data = { currentUser, login, logout };

    return(
        <UserContext.Provider value = {data}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider };
export default UserContext;