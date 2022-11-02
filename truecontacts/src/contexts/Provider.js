import React, { createContext, useReducer } from 'react';
import initAuthState from './intialstates/authState';
import initContactState from './intialstates/contactState';
import auth from './reducers/authReducer';
import contacts from './reducers/contactReducer';

export const GlobalContext = createContext({});
export const GlobalProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(auth, initAuthState);
    const [contactState, contactsDispatch] = useReducer(contacts, initContactState);

    return (
        <GlobalContext.Provider value={
            {
                authState,
                authDispatch,
                contactState,
                contactsDispatch
            }
        }> { children }
        </GlobalContext.Provider>
    )
}