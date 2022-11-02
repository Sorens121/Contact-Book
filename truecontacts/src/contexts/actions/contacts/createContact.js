import { ADD_CONTACT_ERROR, ADD_CONTACT_LOADING, ADD_CONTACT_SUCCESS } from "../../../constants/constants";
import axiosInstance from "../../../helpers/axiosInstance";
import firebaseAddImage from "../../../helpers/firebaseAddImage";


const createContact = ({form: {
    profilePic, 
    firstname, 
    lastname, 
    countrycode, 
    phonenumber,
    email, 
    isFavorite}, id }) => (dispatch) => {
        dispatch({type: ADD_CONTACT_LOADING});

        const saveToBackend = (url=null) => {
            axiosInstance().post(`/users/${id}`, {
                profilePic:url,
                firstname,
                lastname,
                countrycode,
                phonenumber,
                email,
                isFavorite
            }).then((res) => {
                //console.log("res", res);
                dispatch({
                    type: ADD_CONTACT_SUCCESS,
                    payload: res.data
                });
            }).catch((error) => {
                //console.log("error", error);
                dispatch({
                    type: ADD_CONTACT_ERROR,
                    payload: error.response ? error.response.data : 'CONNECTION_ERROR'
                })
            })
        }

        const getURL = (url) => {
            if(url){
                //console.log(url);
                saveToBackend(url);
            } else{
                dispatch({
                    type: ADD_CONTACT_ERROR,
                    payload:'CONNECTION_ERROR'
                }) 
            }
        }
    
        
        if(profilePic) {
            firebaseAddImage(profilePic, id, getURL);
        } else {
            saveToBackend();
        }
        
        
};


export default createContact;
