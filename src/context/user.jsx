import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { loginGoogle, logoutGoogle, observeAuthState } from '../apis';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useLayoutEffect(() => {
        observeAuthState().then((user) => {
            console.log(user);
            if (user) {
                setUser(user);
            }
        });
    }, []);

    const login = async () => {
        const { user } = await loginGoogle();
        setUser(user);
    };

    const logout = () => {
        logoutGoogle();
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
