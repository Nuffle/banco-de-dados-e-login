import { initializeApp } from 'firebase/app'
//importou para ter conexão com o banco
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyByIj68tII9njfjf-Y8JiqFa2OpHP4kYtw",
  authDomain: "curso-2360c.firebaseapp.com",
  projectId: "curso-2360c",
  storageBucket: "curso-2360c.appspot.com",
  messagingSenderId: "126248709181",
  appId: "1:126248709181:web:b67270526552290f6c8e54",
  measurementId: "G-MQ0TG7N77K"
};

//inicializou o firebase
const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

//exportar para poder utilizar
export { db, auth }