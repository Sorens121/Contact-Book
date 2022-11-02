import { UPDATE_CONTACT_ERROR, UPDATE_CONTACT_LOADING, UPDATE_CONTACT_SUCCESS } from "../../../constants/constants";
import axiosInstance from "../../../helpers/axiosInstance";
import firebaseUpdateImage from "../../../helpers/firebaseUpdateImage";


const updateContact = ({id, contact_id, update, prevImgURL, isProfilePic}) => (dispatch) => {
    dispatch({type: UPDATE_CONTACT_LOADING})

    const updateToBackEnd = (newUpdate) => {
        // console.log("old url", prevImgURL);
        // console.log("new update", newUpdate);
        
        axiosInstance().patch(`/users/${id}/${contact_id}`, newUpdate)
            .then((res) => {
                dispatch({
                    type: UPDATE_CONTACT_SUCCESS,
                    payload: res.data
                })
                //console.log("Response from server", res.data)
            })
            .catch((error) => {
                dispatch({
                    type: UPDATE_CONTACT_ERROR,
                    payload: error.response ? error.response.data : 'CONNECTION ERROR'
                })
            }
        );
    }

    const getURL = (url) => {
        let newUpdate = {};
        console.log(url);
        if(url) {
            newUpdate ={...update, profilePic: url}
            updateToBackEnd(newUpdate);
        }
    }
    
    
    if(isProfilePic) {
        // check if prev profile is not null
        if(prevImgURL){
            // replace old pic with new pic
            firebaseUpdateImage(id, prevImgURL, update.profilePic, getURL);
        } else {
            firebaseUpdateImage(id, null, update.profilePic, getURL)
        }
    }
}

export default updateContact;