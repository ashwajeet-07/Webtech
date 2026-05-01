import { useState } from 'react';

function Gallery() {
  const [url, setUrl] = useState('');
  const [images, setImages] = useState([]);

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!url) return;

    setImages([...images, { id: Date.now(), url }]);
    setUrl('');
  };

  return (
    <div className="card">
      <h3>Photo Gallery</h3>
      <form onSubmit={handleAddImage} className="inline-form">
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Enter Image URL"
        />
        <button type="submit" className="btn-add">Add Photo</button>
      </form>

      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((img) => (
            <img key={img.id} src={img.url} alt="Photography" className="gallery-img" />
          ))
        ) : (
          <p className="empty-msg">No images in gallery. Add a URL to see photos!</p>
        )}
      </div>
    </div>
  );
}

export default Gallery;
