import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../assets/images/baner1.png";
import image2 from "../../assets/images/baner2.png";
import image3 from "../../assets/images/baner3.png";

const ExampleCarouselImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "600px",
        objectFit: "cover",
      }}
    />
  );
};

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <ExampleCarouselImage src={image1} alt="First slide" />
        <Carousel.Caption style={{ color: "black" }}>
          {/* <h1>First slide label</h1>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={image2} alt="Second slide" />
        <Carousel.Caption style={{ color: "black" }}>
          {/* <h1>Second slide label</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={image3} alt="Third slide" />
        <Carousel.Caption style={{ color: "black" }}>
          {/* <h1>Third slide label</h1>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ControlledCarousel;
