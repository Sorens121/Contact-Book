import { UPDATE_CONTACT_SUCCESS, UPDATE_PASSWORD_ERROR, UPDATE_PASSWORD_LOADING } from "../../../constants/constants";
import axiosInstance from "../../../helpers/axiosInstance";

const changePassword = ({id, update}) => (dispatch) => {
    dispatch({type: UPDATE_PASSWORD_LOADING});
    
    axiosInstance().patch(`/profile/${id}/changepassword`, update)
        .then((res) => {
            dispatch({
                type: UPDATE_CONTACT_SUCCESS,
                payload: res.data
            })
        }).catch((error) => {
            dispatch({
                type: UPDATE_PASSWORD_ERROR,
                payload: error.response ? error.response.data : 'CONNECTION ERROR'
            })
        })
}

export default changePassword;