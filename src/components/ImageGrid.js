import React from "react";

function ImageGrid({ images, onImageClick }) {
  return (
    <div className="image-grid">
      {images.map((img) => (
        <div key={img.id} className="image-item">
          <img src={img.previewURL} alt={img.tags} />
          <button onClick={() => onImageClick(img.largeImageURL)}>
            Add Captions
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
