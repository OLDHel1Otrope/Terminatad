import React, { useEffect, useRef } from 'react';
// import './styles.css'; // Ensure to import your CSS file

function HorizontalScrollComponent() {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const handleWheel = (event) => {
            if (scrollContainer) {
                event.preventDefault(); // Prevent the default vertical scroll behavior
                scrollContainer.scrollBy({
                    left: event.deltaY, // Apply the vertical scroll to horizontal scroll
                    behavior: 'smooth' // Smooth scrolling
                });
            }
        };

        if (scrollContainer) {
            scrollContainer.addEventListener('wheel', handleWheel);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div className="wrapper1" ref={scrollRef}>
            <div className="item11">item 1</div>
            <div className="item11">item 2</div>
            <div className="item11">item 3</div>
            <div className="item11">item 4</div>
            <div className="item11">item 5</div>
            <div className="item11">item 6</div>
        </div>
    );
}

export default HorizontalScrollComponent;
