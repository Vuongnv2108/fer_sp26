import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Banner() {
  const bannerStyle = {
    width: "100%",
    height: "60vh", // Giảm chiều cao xuống còn 60% chiều cao màn hình
    overflow: "hidden",
    margin: "0 auto",
  };

  const imgStyle = {
    width: "100%",
    height: "60vh", // Đảm bảo hình ảnh vừa với banner
    objectFit: "cover",
  };

  return (
    <div style={bannerStyle}>
      <Carousel interval={null}>
        {["banner2.jpg", "banner3.jpg", "banner4.jpg", "banner5.jpg", "banner.jpg"].map((image, index) => (
          <Carousel.Item key={index}>
            <img
              style={imgStyle}
              className="d-block w-100"
              src={`assets/${image}`}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
