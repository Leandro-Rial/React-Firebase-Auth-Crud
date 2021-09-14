// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, setDoc, doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { uuid } from 'uuidv4';

export function firebaseConfig() {
    const config = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_API_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };
    
    // Initialize Firebase
    const app = initializeApp(config);
    const analytics = getAnalytics(app);
}

export function signup(email, password) {
    createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credenciales => {

    })
}

export async function login(email, password) {
    
    try {
        
        let credenciales = await signInWithEmailAndPassword(getAuth(), email, password)

    } catch (e) {
        return false
    }

    return true

}

export async function search(coleccion) {
    let listado = [];
    let consulta = collection(getFirestore(), coleccion);
    let resultado = await getDocs(consulta);
    resultado.forEach(documento => {
        let objeto = documento.data();
        objeto.id = documento.id;
        listado.push(objeto);
    })
    return listado;
}

export function fbcrearCliente(coleccion, objeto) {
    objeto.id = uuid()
    let referencia = doc(getFirestore(), coleccion, objeto.id);
    setDoc(referencia, objeto);
}

export async function deleted(coleccion, id) {
    await deleteDoc(doc(getFirestore(), coleccion, id))
}