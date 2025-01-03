import React, { useState } from "react";
import { images } from "../Helpers/CarouselData";
import "./Carousel.css"; 

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="carousel">
        <button className="carousel-btn" onClick={handlePrev}>
            &#8249;
        </button>
        <div className="carousel-image-container">
            <img
            src={images[currentIndex].img}
            alt={images[currentIndex].title}
            className="carousel-image"
            />
            <div className="carousel-caption">
            <h3>{images[currentIndex].title}</h3>
            <p>{images[currentIndex].subtitle}</p>
            </div>
        </div>
        <button className="carousel-btn" onClick={handleNext}>
            &#8250;
        </button>
        </div>
    );
};

export default Carousel;
