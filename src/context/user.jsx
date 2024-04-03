import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { firebaseAuth, realtimeDB } from '../apis';
import { ref, get } from 'firebase/database';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    useLayoutEffect(() => {
        firebaseAuth.observe().then(async (user) => {
            if (user) {
                const isAdmin = await checkAdmin(user);
                setUser({
                    ...user,
                    isAdmin
                });
            }
        });
    }, []);

    const login = async () => {
        const { user } = await firebaseAuth.loginGoogle();
        if (!user) return;

        const isAdmin = await checkAdmin(user);
        setUser({
            ...user,
            isAdmin
        });
    };

    const logout = () => {
        firebaseAuth.logout();
        setUser(null);
    };

    async function checkAdmin(user) {
        const adminRef = ref(realtimeDB, 'admin');
        const data = await get(adminRef);
        if (data.exists()) {
            return data.val().includes(user.uid);
        }

        return false;
    }

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
