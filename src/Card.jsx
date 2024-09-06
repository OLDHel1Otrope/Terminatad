import profilepic from './assets/G1.jpg'
import React, { useState, useEffect } from 'react';
import Button from './Button';

function Card(props) {


    return (
        <div className='card' >
            <img className='card-image' src={profilepic} alt="profilepicture"></img>
            <div className='card-desc'>
                <div className='card-init'>
                    <h2 className='card-title'>{props.title}</h2><i>
                        <p className='card-text'>{props.definition}</p></i>
                    <Button name="Launch Eliminated"></Button>
                </div>
            </div>
        </div >
    );
}

//we can define prop types here if we want to
//select default props as well

export default Card;