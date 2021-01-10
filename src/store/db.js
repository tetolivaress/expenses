import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCFIntNoACk3cad1pQ_RoBPlFgYzrYRTRY',
  authDomain: 'diary-book-94707.firebaseapp.com',
  databaseURL: 'https://diary-book-94707.firebaseio.com',
  projectId: 'diary-book-94707',
  storageBucket: 'diary-book-94707.appspot.com',
  messagingSenderId: '475895040261',
  appId: '1:475895040261:web:48bc5c9e7555f467cc8f6c',
  measurementId: 'G-9V730E1L2Q'
}
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
