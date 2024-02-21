// import React, { useState } from 'react';

// // ... (your imports)

// interface CarouselProps {
//     images: string[];
//   }
  
//   const Carousel: React.FC<CarouselProps> = ({ images }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
  
//     const nextSlide = () => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };
  
//     const prevSlide = () => {
//       setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//     };
  
//     const goToSlide = (index: number) => {
//       setCurrentIndex(index);
//     };
  
//     return (
//       <div className="carousel">
//         <div className="slides-container">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               className={`slide ${index === currentIndex ? 'active' : ''}`}
//               src={image}
//               alt={`Slide ${index + 1}`}
//             />
//           ))}
//         </div>
  
//         <div className="arrows">
//           <button className="arrow prev" onClick={prevSlide}>
//             &lt;
//           </button>
//           <button className="arrow next" onClick={nextSlide}>
//             &gt;
//           </button>
//         </div>
  
//         <div className="dots">
//           {images.map((_, index) => (
//             <span
//               key={index}
//               className={`dot ${index === currentIndex ? 'active' : ''}`}
//               onClick={() => goToSlide(index)}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   export default Carousel;
import React, { useState } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="slides-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            className="slide"
            src={image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="arrows">
        <img className='arrow prev' onClick={prevSlide} src="/images/our_story_page/arrow-left.png" alt="" />
        {/* <button className="arrow prev" onClick={prevSlide}>
          &lt;
        </button> */}
                <img className='arrow next' onClick={nextSlide} src="/images/our_story_page/arrow-right.png" alt="" />

        {/* <button className="arrow next" onClick={nextSlide}>
          &gt;
        </button> */}
      </div>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
