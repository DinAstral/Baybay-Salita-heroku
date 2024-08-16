import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            }); //endpoint to fetch user data cookie
        }
    }, []);

    const clearCookie = () => {
        // Clear cookie logic here, such as setting an expired cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUser(null); // Clear user state as well
    };

    return (
        <UserContext.Provider value={{ user, setUser, clearCookie }}>
            {children}
        </UserContext.Provider>
    );
}