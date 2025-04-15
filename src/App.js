// App.js
import React, { useState, useRef } from "react";

import "./styles/App.css";

import SearchBar from "./components/SearchBar";
import ImageGrid from "./components/ImageGrid";
import CanvasEditor from "./components/CanvasEditor";
import DebugPanel from "./components/DebugPanel";

import { searchImagesFromPixabay } from "./utils/api";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [canvasLayers, setCanvasLayers] = useState([]);
  const [error, setError] = useState("");

  const fabricCanvas = useRef(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a valid search term.");
      return;
    }
    try {
      setError("");
      const data = await searchImagesFromPixabay(query);
      if (data.length === 0) {
        setError("No results found. Try a different keyword.");
      } else {
        setImages(data);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching images. Please try again.");
    }
  };

  const handleImageClick = (url) => {
    setError("");
    setSelectedImageUrl(url); // canvas will handle image loading
  };

  return (
    <div className="App">
      <h1>Image Editor</h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ImageGrid images={images} onImageClick={handleImageClick} />
      {selectedImageUrl && (
        <CanvasEditor
          fabricCanvas={fabricCanvas}
          imageUrl={selectedImageUrl}
          canvasLayers={canvasLayers}
          setCanvasLayers={setCanvasLayers}
        />
      )}
      <DebugPanel canvasLayers={canvasLayers} />
    </div>
  );
}

export default App;
