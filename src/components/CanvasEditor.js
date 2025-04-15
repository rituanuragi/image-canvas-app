// components/CanvasEditor.js
import React, { useEffect } from "react";
import { fabric } from "fabric";

const CanvasEditor = ({ fabricCanvas, imageUrl, canvasLayers, setCanvasLayers }) => {
  useEffect(() => {
    if (!fabricCanvas.current) {
      fabricCanvas.current = new fabric.Canvas("fabric-canvas", {
        width: 500,
        height: 300,
        selection: true
      });
    }

    const canvas = fabricCanvas.current;
    canvas.clear(); // Clear previous content

    // Load the selected image as background
    fabric.Image.fromURL(imageUrl, (img) => {
      img.set({
        originX: "left",
        originY: "top",
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
        selectable: false // Make background not draggable
      });
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      setCanvasLayers([{ type: "image", url: imageUrl }]);
    }, { crossOrigin: "anonymous" });
  }, [imageUrl, fabricCanvas, setCanvasLayers]);

  const addText = () => {
    const canvas = fabricCanvas.current;
    const text = new fabric.IText("Editable Text", {
      left: 100,
      top: 100,
      fill: "black",
      fontSize: 24,
      editable: true
    });
    canvas.add(text).setActiveObject(text);
    setCanvasLayers((prev) => [...prev, { type: "text", text: text.text }]);
  };

  const addShape = (shapeType) => {
    const canvas = fabricCanvas.current;
    let shape;

    switch (shapeType) {
      case "circle":
        shape = new fabric.Circle({ radius: 40, fill: "blue", left: 150, top: 150 });
        break;
      case "rectangle":
        shape = new fabric.Rect({ width: 100, height: 60, fill: "green", left: 150, top: 150 });
        break;
      case "triangle":
        shape = new fabric.Triangle({ width: 100, height: 100, fill: "orange", left: 150, top: 150 });
        break;
      case "polygon":
        const pentagonPoints = [];
        const centerX = 50;
        const centerY = 50;
        const radius = 40;
        const sides = 5;
        for (let i = 0; i < sides; i++) {
          const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
          pentagonPoints.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
          });
        }

        shape = new fabric.Polygon(pentagonPoints, {
          fill: "purple",
          left: 150,
          top: 150,
          originX: "center",
          originY: "center"
        });
        break;
      default:
        return;
    }

    canvas.add(shape).setActiveObject(shape);
    setCanvasLayers((prev) => [...prev, { type: "shape", shape: shapeType }]);
  };

  const handleDownload = () => {
    const canvas = fabricCanvas.current;

    // Remove active object border before export
    canvas.discardActiveObject();
    canvas.renderAll();

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited-image.png";
    link.click();
  };

  return (
    <div className="canvas-editor">
        <canvas id="fabric-canvas" />
      <div style={{ marginBottom: "10px" }}>
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("circle")}>Circle</button>
        <button onClick={() => addShape("rectangle")}>Rectangle</button>
        <button onClick={() => addShape("triangle")}>Triangle</button>
        <button onClick={() => addShape("polygon")}>Polygon</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default CanvasEditor;
