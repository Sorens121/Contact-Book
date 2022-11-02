import { deleteObject, ref } from "firebase/storage";
import { FIREBASE_IMAGE_REF } from "../constants/firebase";
import { storage } from "./firebase";

const firebaseDelImage = async (id, imageURL, callback) => {
    if(imageURL) {
        const regex = /%2..*%2F(.*?)\?alt/;
        const match = regex.exec(imageURL);
        const filename = match[1];

        const delRef = ref(storage, `${FIREBASE_IMAGE_REF}/${id}/${filename}`);

        deleteObject(delRef).then(() => {
            const result = 'Success';
            callback(result);
        }).catch((error) => {
            console.log(error.message);
            callback(error)
        })
    }
}

export default firebaseDelImage;