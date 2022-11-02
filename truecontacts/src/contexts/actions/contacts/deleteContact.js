import { DELETE_CONTACT_ERROR, DELETE_CONTACT_LOADING, DELETE_CONTACT_SUCCESS } from "../../../constants/constants";
import axiosInstance from "../../../helpers/axiosInstance";
import firebaseDelImage from "../../../helpers/firebaseDelImage";

const deleteContact = ({id, contact_id, profilePicURL}) => (dispatch) => {
    dispatch({
        type: DELETE_CONTACT_LOADING,
        payload: contact_id
    });

    const deleteContactFromList = () => {
        axiosInstance().delete(`/users/${id}/${contact_id}`).then((res) => {
            //console.log("res", profilePicURL);
            dispatch({
                type: DELETE_CONTACT_SUCCESS,
                payload: contact_id,
            });
        }).catch((error) => {
            //console.log("error", error.status);
            dispatch({
                type: DELETE_CONTACT_ERROR,
                payload: error.respose ? error.respose.data : "CONNECTION ERROR"
            })
        });  
    }

    const getDelRes = (result) => {
        if(result === 'Success'){
            deleteContactFromList();
        } else {
            dispatch({
                type: DELETE_CONTACT_ERROR,
                payload: result
            })
        }
    }

    if(profilePicURL) {
        firebaseDelImage(id, profilePicURL, getDelRes);
    } else {
        deleteContactFromList();
    }

    
    //console.log(`For id ${id} deleting contact id ${contact_id} with ${profilePicURL}`);
    


    

    

    
    // if(profilePicURL){
    //     const regex = /%2..*%2F(.*?)\?alt/;
    //     const match = regex.exec(profilePicURL);
    //     const filename = match[1];

    //     const delRef = ref(storage, `${FIREBASE_IMAGE_REF}/${id}/${filename}`);
    //     //console.log(delRef)

    //     deleteObject(delRef).then(() => {
    //         deleteFmFirebase()
    //         //console.log('file deleted')
    //     }).catch((error) => {
    //         //console.log(error);
    //         dispatch({
    //             type: DELETE_CONTACT_ERROR,
    //             payload: error.respose ? error.respose.data : "CONNECTION ERROR"
    //         })
    //     })
    // } else{
    //     deleteFmFirebase();
    // }
};

export default deleteContact;


//regex ---> /%2..*%2F(.*?)\?alt/
