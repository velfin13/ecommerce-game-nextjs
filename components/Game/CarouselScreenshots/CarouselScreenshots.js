import React, { useState } from "react";
import Slider from "react-slick";
import { Image, Modal } from "semantic-ui-react";
import { map } from "lodash";

const CarouselScreenshots = (props) => {
  const { title, screeshots } = props;

  const [url, setUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openImage = (url) => {
    setUrl(url);
    setShowModal(true);
  };

  const settings = {
    className: "carousel-screenshots",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    swipeToSlider: true,
  };

  return (
    <>
      <Slider {...settings}>
        {map(screeshots, (screeshot) => (
          <Image
            key={screeshot.id}
            src={screeshot.url}
            alt={screeshot.name}
            onClick={() => openImage(screeshot.url)}
          />
        ))}
      </Slider>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={url} alt={title} />
      </Modal>
    </>
  );
};

export default CarouselScreenshots;
