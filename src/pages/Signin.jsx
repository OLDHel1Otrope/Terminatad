import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import react, { useState } from "react";
import { app } from "../Firebase"
import { firebaseAuth, useFirebase } from '../context/Firebase'


const auth = getAuth(app)
const SigninPage = () => {
    const firebase = useFirebase();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signinUser = () => {
        signInWithEmailAndPassword(auth, email, password).then(value => console.log("signin success"))
            .catch(err => console.log(err))
        setEmail("");
        setPassword("");
    }

    return (
        <div className="signup-page">
            <h2>SignIn</h2>
            <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="enter your email" /><br></br>

            <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="enter your password" /><br></br>
            <button className="button1" onClick={() => {
                signinUser(email, password);
                console.log("logged in")
            }}>Sign in</button><br></br>
        </div>
    )
}
export default SigninPage;