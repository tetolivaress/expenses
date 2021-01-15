import firebase from 'firebase/app'
import firebaseConfig from '../../firebaseConfig.json'
import 'firebase/firestore'

export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()
// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }
