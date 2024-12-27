import PropTypes from 'prop-types';
import { useState } from 'react';

function ImageGrid({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const getGridClass = (length) => {
    switch (length) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-2';
      case 4:
        return 'grid-cols-2';
      default:
        return 'grid-cols-3';
    }
  };

  return (
    <>
      <div className={`grid ${getGridClass(images.length)} gap-1`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative ${images.length === 3 && index === 0 ? 'row-span-2' : ''
              } ${images.length > 4 && index >= 4 ? 'hidden md:block' : ''
              }`}
          >
            {
              image?.includes('video') ? (
                <video
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-full object-contain rounded-md cursor-pointer"
                  style={{ aspectRatio: '1/1' }}
                  onClick={() => setSelectedImage(image)}
                  autoPlay
                  muted
                  loop
                />
              )
                :
                (
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-full object-cover rounded-md cursor-pointer"
                    style={{ aspectRatio: '1/1' }}
                    onClick={() => setSelectedImage(image)}
                  />
                )
            }

            {images.length > 4 && index === 3 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                <span className="text-white text-xl font-semibold">
                  +{images.length - 4}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full size"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
}

ImageGrid.propTypes = {
  images: PropTypes.any,
}

export default ImageGrid