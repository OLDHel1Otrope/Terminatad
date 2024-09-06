import React, { useState, useEffect } from 'react';
import { sculptureList } from './assets/Data';
import './Gallery.css'; // Import CSS file for styling

export default function Gallery() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    // Function to advance to the next sculpture
    function handleNextClick() {
        setIndex((index + 1) % sculptureList.length);
    }

    // Function to toggle showMore state
    function handleMoreClick() {
        setShowMore(!showMore);
    }

    // Automatically advance to the next sculpture after 7 seconds
    useEffect(() => {
        const timer = setTimeout(handleNextClick, 5000); // 7000 milliseconds = 7 seconds

        // Clean up the timer to avoid memory leaks
        return () => clearTimeout(timer);
    }, [index]); // Trigger useEffect whenever index changes

    // Get current sculpture
    let sculpture = sculptureList[index];

    return (
        <div className="gallery-container">
            <div className="image-container">
                <img

                    src={sculpture.url}
                    alt={sculpture.alt}
                    className="sculpture-image"
                />
                <div className="text-overlay">
                    <h2>
                        <i>{sculpture.name} </i>
                        by {sculpture.artist}
                    </h2>
                    <h3>
                        ({index + 1} of {sculptureList.length})
                    </h3>
                    <button onClick={handleMoreClick}>
                        {showMore ? 'Hide' : 'Show'} details
                    </button>
                    {showMore && <p>{sculpture.description}</p>}
                </div>
            </div>
        </div>
    );
}
