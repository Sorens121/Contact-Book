import { deleteObject, ref } from "firebase/storage";
import { FIREBASE_IMAGE_REF } from "../constants/firebase";
import { storage } from "./firebase";

const firebaseUpdateImage = async (id, prevPicURL=null, newPicURL, callback) => {
    //console.log("newPicURL", newPicURL);
    // add new image and remove previous image
    if(newPicURL) {
        // check for prevURL
        if(prevPicURL) {
            delImage(id, prevPicURL);  
        }
        uploadImage(newPicURL, id, callback);
    }
}

const uploadImage = async (image, id, callback) => {
    const filename = new Date().getTime().toString() + "_" + image.name;
    const uploadTask = storage.ref(`${FIREBASE_IMAGE_REF}/${id}/${filename}`).put(image);
    uploadTask.on("state_changed", (snapshot) => {},
    async (error) => console.log(error),
    async () => {
        const url = await storage.ref(`${FIREBASE_IMAGE_REF}/${id}`)
            .child(`${filename}`).getDownloadURL();
        //console.log(url);
        callback(url);
    }); 
}

const delImage = async (id, imageURL) => {
    if(imageURL) {
        const regex = /%2..*%2F(.*?)\?alt/;
        const match = regex.exec(imageURL);
        const filename = match[1];

        const delRef = ref(storage, `${FIREBASE_IMAGE_REF}/${id}/${filename}`);

        deleteObject(delRef).then(() => {
            console.log("Image replaced successfully");
    
        }). catch((error) => {
            console.log(error);
        })
    }
}

export default firebaseUpdateImage;