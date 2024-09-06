import { Link, NavLink } from 'react-router-dom';
import UserDisplay from './UserDisplay';
import { useFirebase } from './context/Firebase';
import React, { useEffect, useState } from 'react';

function Header() {
    const { getCurrentUser } = useFirebase();
    const [user, setUser] = useState("Login");
    const [email, setEmail] = useState("Login");

    useEffect(() => {
        getCurrentUser().then((currentUser) => {
            setUser(currentUser);
        }).catch((error) => {
            console.error('Error getting current user:', error);
        });
    }, [getCurrentUser]);

    useEffect(() => {
        if (user == null) {
            setEmail("Login")
            console.log("resource changed");
        }
        else setEmail(user.email)
    }, [user]);




    return (
        <header className='header'>
            <span className="logo">TERMINATAD</span>
            <nav className='navbar'>
                <NavLink to="/" className="links" activeclassname="active">Home</NavLink>
                <NavLink to="/about" className="links" activeclassname="active">About</NavLink>
                <NavLink to="/eliminated" className="links" activeclassname="active">Eliminated</NavLink>
                <NavLink to="/services" className="links" activeclassname="active">Services</NavLink>
                <NavLink to="/development" className="links" activeclassname="active">Development</NavLink>
                <NavLink to="/login" className="links2" activeclassname="active2">
                    <UserDisplay name={email} />
                </NavLink>
            </nav>
        </header>);
}

export default Header;