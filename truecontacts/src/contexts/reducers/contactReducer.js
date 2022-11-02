import { ADD_CONTACT_ERROR, ADD_CONTACT_LOADING, ADD_CONTACT_SUCCESS, ADD_REMOVE_FROM_FAVORITE_SUCCESS, CLEAR_ADD_CONTACT, DELETE_CONTACT_LOADING, DELETE_CONTACT_SUCCESS, GET_CONTACTS_ERROR, GET_CONTACTS_LOADING, GET_CONTACTS_SUCCESS, LOGOUT_USER, SEARCH_CONTACTS, UPDATE_CONTACT_SUCCESS } from "../../constants/constants";
import contactInitialState from "../intialstates/contactState";


const contacts = (state, {payload, type}) => {
    switch(type){
        case GET_CONTACTS_LOADING:
            return {
                ...state,
                isAuthenticated: false,
                contacts: {
                    ...state.contacts,
                    loading: true
                }
            }
        case GET_CONTACTS_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: payload
                }
            }

        case GET_CONTACTS_ERROR:
            return {
                ...state,
                isAuthenticated: true,
                contacts: {
                    ...state.contacts,
                    error: payload,
                    loading: false
                }
            }

        case LOGOUT_USER:
            return{
                ...state,
                contactInitialState
            }

        case ADD_CONTACT_LOADING: 
            return {
                ...state,
                addContact: {
                    ...state.addContact,
                    loading: true,
                    error: null
                }
            }
        
        case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                addContact: {
                    ...state.addContact,
                    loading: false,
                    data: payload
                },
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: [payload, ...state.contacts.data],
                }
            }

        case ADD_CONTACT_ERROR:
            return {
                ...state,
                addContact: {
                    ...state.addContact,
                    loading: false,
                }
            }

        case CLEAR_ADD_CONTACT:
            return {
                ...state,
                addContact: {
                    ...state.addContact,
                    error: null,
                    loading: false,
                    data: null
                }
            }

        case SEARCH_CONTACTS: {
            const searchValue = payload?.toLowerCase();
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    isSearchActive: !!payload.length > 0 || false,
                    foundContacts: state.contacts.data.filter((item)=>{
                        try {
                            return (
                                item.firstname.toLowerCase().search(searchValue) !== -1 ||
                                item.lastname.toLowerCase().search(searchValue) !== -1 ||
                                item.phonenumber.toLowerCase().search(searchValue) !== -1
                            );
                        } catch (error) {
                            return [];
                        }
                    })
                }
            };
        }

        case DELETE_CONTACT_LOADING: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: state.contacts.data.map((item) => {
                        if(item._id === payload){
                            return {...item, deleting: true};
                        }
                        return item;
                    })
                }
            }
        }

        case DELETE_CONTACT_SUCCESS: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: state.contacts.data.filter((item) => item._id !== payload)
                }
            }
        }

        case ADD_REMOVE_FROM_FAVORITE_SUCCESS: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    data: payload
                }
            }
        }

        case UPDATE_CONTACT_SUCCESS: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    data: payload
                }
            }
        }

        default:
            return state;
    }
}

export default contacts;