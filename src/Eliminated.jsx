import Header from './Header'
import Footer from './Footer'
import ImageComponent from './ImageComponent';
import { useFirebase } from './context/Firebase';
import React, { useEffect, useState } from 'react';


function Eliminated() {
    const { getCurrentUser } = useFirebase();
    const [user, setUser] = useState("Login");
    useEffect(() => {
        getCurrentUser().then((currentUser) => {
            setUser(currentUser);
        }).catch((error) => {
            console.error('Error getting current user:', error);
        });
    }, [getCurrentUser]);


    return (
        <>
            <Header />
            <div className='focuss'>
                <div className='login-holder'>
                    <ImageComponent></ImageComponent>
                </div>

            </div>
            <Footer />
        </>
    );
}
export default Eliminated;