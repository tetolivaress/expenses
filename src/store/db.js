import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from '../../firebaseConfig.json'


// firebase
//   .initializeApp(firebaseConfig)
//   .firestore()
//   .collection('expenses')
//   .get()
//   .then((doc) => {
//     doc.forEach((s) => {
//       console.log(s.data())
//     })
//   })

export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()
// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }
