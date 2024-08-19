import React from 'react';
import img1 from './../../assets/img5.png'

const ExampleCarouselImage = ({ text }) => {
  return (
    <div>
      {/* Replace 'src' with the actual source of your image */}
      <img
        className="d-center w-50"
        src={img1}
        alt={text}
      />
    </div>
  );
};

export default ExampleCarouselImage;
