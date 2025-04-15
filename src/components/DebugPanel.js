import React from "react";

function DebugPanel({ canvasLayers }) {
  return (
    <div className="debug-panel">
      <h3>🛠️ Debug Panel: Canvas Layers</h3>
      <pre className="debug-pre">
        {JSON.stringify(canvasLayers, null, 2)}
      </pre>
    </div>
  );
}

export default DebugPanel;
