import { ADD_REMOVE_FROM_FAVORITE_ERROR, ADD_REMOVE_FROM_FAVORITE_LOADING, ADD_REMOVE_FROM_FAVORITE_SUCCESS } from "../../../constants/constants";
import axiosInstance from "../../../helpers/axiosInstance";


const addToFavorite = ({id, contact_id, isFavorite}) => (dispatch) => {
   dispatch({
    type: ADD_REMOVE_FROM_FAVORITE_LOADING,
    payload: contact_id
   });

   axiosInstance().patch(`/users/${id}/${contact_id}`, {isFavorite})
    .then((res) => {
        //console.log("data from server",res.data);
        dispatch({
            type: ADD_REMOVE_FROM_FAVORITE_SUCCESS,
            payload: res.data,
        })
    })
    .catch((error) => {
        dispatch({
            type: ADD_REMOVE_FROM_FAVORITE_ERROR,
            payload: error.response ? error.response.data : 'CONNECTION ERROR'
        })
    });
};

export default addToFavorite;