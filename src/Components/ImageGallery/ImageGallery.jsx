import PropTypes from 'prop-types';
import { ImageGallery, EmptyResponse } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';

export default function imageGallery({
  response,
  emptyResponse,
  isLoading,
  onImageClick,
}) {
  return (
    <div>
      {emptyResponse && (
        <EmptyResponse>
          Nothing came up for your search query &#128533;
        </EmptyResponse>
      )}
      <ImageGallery onClick={onImageClick}>
        {response.map(item => {
          return (
            <ImageGalleryItem
              key={item.id}
              id={item.id}
              largeImageURL={item.largeImageURL}
              webformatURL={item.webformatURL}
              tags={item.tags}
            />
          );
        })}
      </ImageGallery>
      {isLoading && <Loader />}
    </div>
  );
}

imageGallery.propTypes = {
  response: PropTypes.array,
  emptyResponse: PropTypes.bool,
  isLoading: PropTypes.bool,
};
