import React, { createContext, useReducer } from 'react';
import initAuthState from './intialstates/authState';
import initContactState from './intialstates/contactState';
import initProfileState from './intialstates/profileState';
import auth from './reducers/authReducer';
import contacts from './reducers/contactReducer';
import profile from './reducers/profileReducer';

export const GlobalContext = createContext({});
export const GlobalProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(auth, initAuthState);
    const [contactState, contactsDispatch] = useReducer(contacts, initContactState);
    const [profileState, profileDispatch] = useReducer(profile, initProfileState);
    
    return (
        <GlobalContext.Provider value={
            {
                authState,
                authDispatch,
                contactState,
                contactsDispatch,
                profileState,
                profileDispatch
            }
        }> { children }
        </GlobalContext.Provider>
    )
}