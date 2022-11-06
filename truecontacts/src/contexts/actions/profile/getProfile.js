import { PROFILE_LOADING, PROFILE_LOADING_ERROR, PROFILE_LOADING_SUCCESS } from "../../../constants/constants";
import axiosInstance from "../../../helpers/axiosInstance";

const getProfile = ({id}) => (dispatch) => {
    dispatch({type: PROFILE_LOADING});

    axiosInstance().get(`/profile/${id}`)
        .then((res) => {
            dispatch({
                type: PROFILE_LOADING_SUCCESS,
                payload: res.data
            });
            //console.log("from api profile data", res.data);
        })
        .catch((error) => {
            dispatch({
                type: PROFILE_LOADING_ERROR,
                payload: error.response ? error.response.data : 'CONNECTION ERROR'
            });
            //console.log("error", error);
        })
}

export default getProfile;