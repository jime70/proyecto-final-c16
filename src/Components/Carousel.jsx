import React, { useState } from "react";
import { images } from "../Helpers/CarouselData";
import "./Carousel.css"; 
import { Typography } from "@mui/material";

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
        <> 
        <Typography gutterBottom variant="body1" padding= '20px' color="black" sx={{ 
            fontSize: "25px",
            fontWeight: "bold",
            fontStyle: "italic",
            fontFamily: "Helvetica, sans-serif",
            textAlign: "center",
            }}>
            Lo invitamos a conocernos
        </Typography>
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
        </>
    );
};

export default Carousel;
