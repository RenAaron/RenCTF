import React, { useState, useEffect } from 'react';

const Tutorial = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      type: "image",
      src: "/icons/NOVAWARD.gif",
      caption: "Hello! Ok so we lowkey DONT have the tshirts yet so im giving away this coffee machine i STOLE from my last co-op to whomever wins first place this month. If you have any questions ask on the Discord. Updates for this week on next slide ➡️➡️➡️➡️"
    },
    {
      type: "image",
      src: "/icons/Skull.gif", // Replace with your desired video URL
      caption: "UPDATES!! Account creation has been restricted to RIT domain emails ONLY‼️ No cheesing the game board anymore >:[ ~ I animated new gifs for red and blue tiles AND we have this dope console to track who completed what and when! Challenges will go up periodically this week! Last week's game miraculously ended in a 32 to 32 tie between Red and Blue Team! "
    },
    {
      type: "video",
      src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      caption: "Tutorial video as always!"
    }
  ];

  const showSlides = (n) => {
    let newIndex = slideIndex + n;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;
    setSlideIndex(newIndex);
  };

  return (
    <main style={{ width: '100%', height: '100%', display: "flex", alignItems: "center", flexDirection: 'column', overflow: 'hidden'}}>
      {/* <div style={{height: '10%', justifyContent: "center", width: '100%', alignItems: "center", display: "flex", marginTop: '10px'}}>
        <h1 style ={{fontSize: 50}}>Updates</h1>
      </div> */}

      <div style={{height: '10%', justifyContent: "center", width: '100%', alignItems: "center", display: "flex", marginTop: '30px', justifyContent: 'center'}}>
        <h2 style ={{fontSize: 50, marginRight: '10px'}}>Updates </h2>
      </div>

      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slides fade ${slide.type === 'video' ? 'video-slide' : ''}`}
            style={{ display: slideIndex === index ? 'flex' : 'none' }}
          >
            {slide.type === "image" ? (
              <img src={slide.src} alt={`Image ${index + 1}`} className="pixel-art-no-scale" />
            ) : (
              <div className="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/979KK8F5-TI?si=M6BjGUCabeM4hujY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            )}
            <div className="text">{slide.caption}</div>
          </div>
        ))}

        <a className="prev" onClick={() => showSlides(-1)}>&#10094;</a>
        <a className="next" onClick={() => showSlides(1)}>&#10095;</a>
      </div>
    </main>
  );
};

export default Tutorial;
