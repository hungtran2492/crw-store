import { createContext, useState, useEffect } from 'react'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../ultils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unSubcribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })

        return unSubcribe

    }, [])

    return <UserContext.Provider value={value}>

        {children}</UserContext.Provider>
}