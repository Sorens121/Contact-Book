const contactInitialState = {
    isAuthenticated: false,
    contacts: {
        loading: false,
        data: [],
        error: null,
        isSearchActive: false,
        foundContacts: []
    },
    addContact: {
        loading: false,
        error: null,
        data: null
    }
};

export default contactInitialState;