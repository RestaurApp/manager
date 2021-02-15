import firebase from 'firebase/app'
import 'firebase/auth'

export const firebaseConfig = {
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  private_key: process.env.REACT_APP_FIREBASE_PRIVATE_KEY,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  appId: process.env.REACT_APP_APP_ID
}

export default firebase.initializeApp(firebaseConfig)