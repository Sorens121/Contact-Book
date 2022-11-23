import { UPDATE_CONTACT_ERROR, UPDATE_CONTACT_LOADING, UPDATE_CONTACT_SUCCESS } from "../../../constants/constants";
import axiosInstance from "../../../helpers/axiosInstance";
import firebaseAddImage from "../../../helpers/firebaseAddImage";
import firebaseUpdateImage from "../../../helpers/firebaseUpdateImage";

const updateProfile = ({id, update, prevImgURL, isProfilePic}) => (dispatch) => {
    dispatch({type: UPDATE_CONTACT_LOADING});

    const updateToBackEnd = (newUpdate) => {
        axiosInstance().patch(`/profile/${id}/update`, newUpdate)
            .then((res) => {
                dispatch({
                    type: UPDATE_CONTACT_SUCCESS,
                    payload: res.data
                })
                console.log("from api: ", res.data);
            }).catch((error) => {
                dispatch({
                    type: UPDATE_CONTACT_ERROR,
                    payload: error.response ? error.response.data : 'CONNECTION ERROR'
                })
            }
        );
    }

    const getURL = (url) => {
        let newUpdate = {};
        if(url) {
            newUpdate = {...update, profilepic: url};
            console.log("new update", newUpdate);
            updateToBackEnd(newUpdate)
        }
    }

    if(isProfilePic){
        if(prevImgURL){
            firebaseUpdateImage(id, prevImgURL, update.profilepic, getURL);
        } else {
            firebaseAddImage(update.profilepic, id, getURL);
        }
    } else {
        updateToBackEnd(update);
    }

};

export default updateProfile;