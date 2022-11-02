import axiosInstance from "../../../helpers/axiosInstance";
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from "../../../constants/constants";

export const loginActions = ({username, password}) => (dispatch) => {
    dispatch({type: LOGIN_LOADING });

    axiosInstance().post("/login", {username, password})
        .then((res) => {
            localStorage.token = res.data.accessToken;
            localStorage.user_id = res.data.user.id;
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch((error) => {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response ? error.response.data : {message: "Could Not Connect"},
            });
        })
}