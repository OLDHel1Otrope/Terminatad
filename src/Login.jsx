import Header from './Header'
import Footer from './Footer'
import SignupPage from './pages/Signup';
import SigninPage from './pages/Signin';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { app } from "./Firebase"


const auth = getAuth(app);
function Login() {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(prevState => !prevState);
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                //user is logged in
                console.log('hello', user)
                setUser(user);
            }
            else {
                //user isn't logged in
                console.log("logged out")
                setUser(null)
            }
        })
        // console.log(user)
    })

    if (user == null) {
        return (
            <>
                <Header />
                <div className='focuss'>
                    <div className='login-holder'>
                        <div className='login-holder-block'>
                            <button className='toggleSwitch' onClick={toggleForm}>{isSignIn ? 'Switch' : 'Switch'}</button>
                            {isSignIn ? <SignupPage /> : <SigninPage />}
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />
            <div className='focuss'>
                <div>
                    <h1>Hello {user.email} </h1>
                    <h1> {user.displayName} </h1>
                    <h3>{JSON.stringify(user, null, 2)}</h3>
                    <button className='button' onClick={() => signOut(auth)}>Logout</button>
                </div>
            </div>
            <Footer />
        </>);
}

export default Login
