import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { firebaseAuth } from '../apis';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useLayoutEffect(() => {
        firebaseAuth.observe().then((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    const login = async () => {
        const { user } = await firebaseAuth.loginGoogle();
        console.log(user);
        setUser(user);
    };

    const logout = () => {
        firebaseAuth.logout();
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
