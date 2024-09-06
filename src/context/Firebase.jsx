import { createContext, useContext } from "react";
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, set, ref } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBEM_hUYpUAwWmNqJ5uJbbrBiK4bI7P9bk",
    authDomain: "terminatedreact.firebaseapp.com",
    projectId: "terminatedreact",
    storageBucket: "terminatedreact.appspot.com",
    messagingSenderId: "730805167440",
    appId: "1:730805167440:web:0e281059b6b98c284db855",
    databaseURL: "https://terminatedreact-default-rtdb.firebaseio.com/"
};

const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
// console.log(firebaseAuth)
const database = getDatabase(firebaseApp)

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)

    }

    const putData = (key, data) => {
        set(ref(database, key), data);

    }

    const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(firebaseAuth, (user) => {
                resolve(user);
            }, (error) => {
                reject(error);
            });
        });
    }

    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, putData, getCurrentUser }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}