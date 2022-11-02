import { GET_CONTACTS_ERROR, GET_CONTACTS_LOADING, GET_CONTACTS_SUCCESS } from "../../../constants/constants";
import axiosInstance from "../../../helpers/axiosInstance";

const getContacts = ({history, id}) => (dispatch) =>{
    dispatch({type: GET_CONTACTS_LOADING});
    axiosInstance(history).get(`/users/${id}`)
        .then((res) => {
            dispatch({
                type: GET_CONTACTS_SUCCESS,
                payload: res.data.contactlist
            });
            //console.log("data", res.data);
        })
        .catch((error) => {
            dispatch({
                type: GET_CONTACTS_ERROR,
                payload: error.response ? error.response.data : 'CONNECTION ERROR'
            });
            //console.log("error",error);
        })
};

export default getContacts;