import React, { useState, useRef, MouseEvent } from "react";
import "./Cube.scss";
import GameGrid from "../GameGrid/GameGrid.page";

// Define an interface for the rotation state
interface RotationState {
  x: number;
  y: number;
}

// Define the Cube component
const Cube: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [rotation, setRotation] = useState<RotationState>({ x: 0, y: 0 });
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - lastMousePosition.current.x;
    const dy = e.clientY - lastMousePosition.current.y;
    setRotation((rotation) => ({
      x: rotation.x - dy * 0.5, // Adjust rotation sensitivity here
      y: rotation.y + dx * 0.5,
    }));
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="cube"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Ensure dragging stops if mouse leaves the component
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <div className="face front">
        {/* <GameGrid setScore={() => {}} /> */}
      </div>
      <div className="face back">Back</div>
      <div className="face right">Right</div>
      <div className="face left">Left</div>
      <div className="face top">Top</div>
      <div className="face bottom">Bottom</div>
    </div>
  );
};

export default Cube;
