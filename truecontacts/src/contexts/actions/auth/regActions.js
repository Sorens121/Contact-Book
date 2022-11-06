import axiosInstance from '../../../helpers/axiosInstance';
import { REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_ERROR } from '../../../constants/constants';

export const regActions = ({
    username, 
    firstname, 
    lastname, 
    email, 
    password }) => (dispatch) => {
    dispatch({type: REGISTER_LOADING});
    axiosInstance().post('/register', {
        username,
        firstname,
        lastname,
        email,
        password
    }).then((res) => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }).catch((error) => {
        dispatch({
            type: REGISTER_ERROR,
            payload: error.response ? error.response.data : "CANNOT CONNECT"
        });
        //console.log("error from api: ", error.response.data);
    })
}