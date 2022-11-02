import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { 
    REACT_APP_AUTH_DOMAIN, 
    REACT_APP_DATABASE_URL, 
    REACT_APP_FIREBASE_API_ID, 
    REACT_APP_FIREBASE_API_KEY, 
    REACT_APP_FIREBASE_MESSAGIN_ID, 
    REACT_APP_FIREBASE_STORAGE_BUCKET, 
    REACT_APP_PROJECT_ID
} from '../constants/firebase';

const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    databaseURL: REACT_APP_DATABASE_URL,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGIN_ID,
    appId: REACT_APP_FIREBASE_API_ID
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default};