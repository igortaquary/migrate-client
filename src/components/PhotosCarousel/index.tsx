import { Carousel } from "@trendyol-js/react-carousel";
import { Photo } from "../../types/photo.type";
import "./index.scss";

interface IPhotosCarousel {
  photos: Photo[];
}

interface IArrow {
  left?: boolean;
}

export const PhotosCarousel = ({ photos }: IPhotosCarousel) => {
  return (
    <Carousel
      show={1}
      slide={1}
      leftArrow={<Arrow left />}
      rightArrow={<Arrow />}
      swiping
      swipeOn={0.4}
      infinite={false}
      className='photo-carousel'
    >
      {photos.map((photo, key) => (
        <div key={key} className='photo-carousel-item'>
          <img src={photo.url} />
        </div>
      ))}
    </Carousel>
  );
};

const Arrow = ({ left }: IArrow) => {
  return (
    <div className='arrow-button'>
      <i className={`bi bi-chevron-${left ? "left" : "right"}`}></i>
    </div>
  );
};
