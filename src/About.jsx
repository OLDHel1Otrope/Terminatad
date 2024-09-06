import Header from './Header'
import Footer from './Footer'
import React, { useEffect } from "react";
import "./aboutstyle.css";
import pict1 from "./assets/pict1.jpg";
import pic1 from "./assets/pic1.jpg";
// import pic3 from "./assets/pic3.jpg";
// import pic4 from "./assets/pic4.jpg";
// import pic5 from "./assets/pic5.jpg";
// import pic6 from "./assets/pic6.jpg";
import unetpic from "./assets/pic1.png";
import pic2 from "./assets/pic2.png";
import before from "./assets/image1-2.png"
import after from "./assets/path_to_your_output_image.jpg"

function About() {
    useEffect(() => {
        const container = document.querySelector(".custom-image-slider");
        const afterImage = document.querySelector(".slider-after");
        const handle = document.querySelector(".slider-handle");

        const moveHandle = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.type.includes("mouse")
                ? e.clientX - rect.left
                : e.touches[0].clientX - rect.left;
            let widthPercentage = (x / rect.width) * 100;

            widthPercentage = Math.max(0, Math.min(widthPercentage, 100));

            handle.style.left = `${widthPercentage}%`;
            afterImage.style.clipPath = `inset(0 ${100 - widthPercentage}% 0 0)`;
        };

        container.addEventListener("mousemove", moveHandle);
        container.addEventListener("touchmove", moveHandle);
        return () => {
            container.removeEventListener("mousemove", moveHandle);
            container.removeEventListener("touchmove", moveHandle);
        };
    }, []);

    return (
        <>
            <Header />
            <div className='focuss'>
                <div className="container2">
                    <div className="cont1">
                        <img src={pic2} alt="Description" />
                    </div>

                    <div className="cont1">
                        {/* <p>Little bit about our page.</p> */}
                        <img src={unetpic} alt="Description" />
                    </div>
                    {/* <div className="cont1">
                        <div className="img4">
                            <p>Little bit about our page.</p>
                            <img src={pic4} alt="Description" />
                        </div>
                    </div>
                    <div className="cont1">
                        <div className="img5">
                            <img src={pic5} alt="Description" />
                            <p>Little bit about our page.</p>
                        </div>
                    </div>

                    <div className="cont1">
                        <p>Little bit about our page.</p>
                        <img src={pic6} alt="Description" />
                    </div> */}
                    <div className="cont5">
                        <div className="custom-image-slider" id="customImageSlider">
                            <img className="slider-before" src={before} alt="Before" />
                            <img className="slider-after" src={after} alt="After" />
                            <div className="slider-handle"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

}

export default About
