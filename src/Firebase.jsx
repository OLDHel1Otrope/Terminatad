import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyBEM_hUYpUAwWmNqJ5uJbbrBiK4bI7P9bk",
    authDomain: "terminatedreact.firebaseapp.com",
    projectId: "terminatedreact",
    storageBucket: "terminatedreact.appspot.com",
    messagingSenderId: "730805167440",
    appId: "1:730805167440:web:0e281059b6b98c284db855",
    databaseURL: "https://terminatedreact-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig)
