import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from "../../constants/constants";

const auth = (state, {payload, type}) => {
    switch(type) {
        case REGISTER_LOADING:
        case LOGIN_LOADING:
            return {
                ...state,
                auth:{
                    ...state.auth,
                    isAuthenticated: false,
                    loading: true,
                    error: null,
                }
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    isAuthenticated: true,
                    data: payload,
                    error: null
                }
            }

        case REGISTER_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isAuthenticated: false,
                    loading: false,
                    error: payload,
                }
            }
        default:
            return state;
    }
};

export default auth;