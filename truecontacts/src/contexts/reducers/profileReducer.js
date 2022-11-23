import { PROFILE_LOADING, PROFILE_LOADING_ERROR, PROFILE_LOADING_SUCCESS, UPDATE_PASSWORD_ERROR, UPDATE_PASSWORD_LOADING, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_SUCCESS } from "../../constants/constants";

const profile = (state, {payload, type}) => {
    switch(type) {
        case UPDATE_PASSWORD_LOADING:
        case PROFILE_LOADING:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: true,
                }
            }
        
        case UPDATE_PASSWORD_SUCCESS:
        case PROFILE_LOADING_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: false,
                    data: payload,
                    error: null
                }
            }
        
        case PROFILE_LOADING_ERROR:
        case UPDATE_PROFILE_ERROR:
        case UPDATE_PASSWORD_ERROR:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: false,
                    error: payload
                }
            }

        default:
            return state;
    }
};

export default profile;