import { FIREBASE_IMAGE_REF } from "../constants/firebase";
import { storage } from "./firebase";

const firebaseAddImage = async (image, id, callback) => {
    const fileName = new Date().getTime().toString() + "_" + image.name;
    const uploadTask = storage.ref(`${FIREBASE_IMAGE_REF}/${id}/${fileName}`).put(image);
    uploadTask.on("state_changed", (snapshot) => {},
    async (error) =>  console.log(error),
    async () => {
        const url = await storage.ref(`${FIREBASE_IMAGE_REF}/${id}`)
            .child(`${fileName}`).getDownloadURL();
        //console.log(url);
        callback(url);
    })
}

export default firebaseAddImage;
