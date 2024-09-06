import react, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from "../Firebase"
import { firebaseAuth, useFirebase } from '../context/Firebase'

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const firebase = useFirebase();
    console.log("firebase", firebase)

    const signupUser = () => {
        createUserWithEmailAndPassword(firebaseAuth, email, password
        ).then(value => console.log(value));
    }

    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
    }

    return (
        <div className="signup-page">
            <h2>Signup</h2>
            <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="enter your email" /><br></br>
            <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="enter your password" /><br></br>
            <button className="button1" onClick={() => {
                firebase.signupUserWithEmailAndPassword(email, password);
                firebase.putData('users/' + "user", { email, password });
                console.log("data sent")
            }}>Sign up</button><br></br>
            <button className='button1' onClick={signUpWithGoogle}>Sign up with Google</button>
        </div>
    )
}

export default SignupPage;