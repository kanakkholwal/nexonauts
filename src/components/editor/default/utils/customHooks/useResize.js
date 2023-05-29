import { useState } from 'react';

const useResize = (width, height) => {
  width = width || 300;
  height = height || 300;
  const [size, setSize] = useState({ width, height });
  const [resizing, setResizing] = useState(false);
  const onMouseDown = () => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    setResizing(true);
  };
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    setResizing(false);
  };
  const onMouseMove = (e) => {
    setSize((currentSize) => ({
      width: parseInt(currentSize.width) + e.movementX,
      height: parseInt(currentSize.height) + e.movementY,
    }));
  };

  return [size, onMouseDown, resizing];
};

export default useResize;
