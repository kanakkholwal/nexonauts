import { useState } from 'react';

const useResize = ()=>{
    const [size,setSize] = useState({width:300,height:300});
    const [resizing,setResizing] = useState(false);
    const onMouseDown = ()=>{
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        setResizing(true);
    }
    const onMouseUp = () =>{
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
          setResizing(false);
    }
    const onMouseMove = (e) => {
        setSize(currentSize => ({ 
          width: currentSize.width + e.movementX , 
          height: currentSize.height + e.movementY 
        }));
    }

    return [size,onMouseDown,resizing];
}


export default useResize;