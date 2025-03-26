import { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      <img src={selectedImage} alt="Product" className="w-full h-96 object-cover rounded-lg shadow-md" />
      <div className="flex gap-2 mt-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Thumbnail"
            className="w-16 h-16 object-cover border rounded cursor-pointer"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
