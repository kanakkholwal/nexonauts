import { useState, useEffect, useRef } from 'react';
import useFormat from './useFormat.js';


//This hook returns should we show the custom context menu and where to show it.
const useContextMenu = (editor,format,setSelection) => {
    const isFormat = useRef();
    isFormat.current = useFormat(editor,format);
    const [showMenu,setShowMenu] = useState(false);
    const [menuLocation,setMenuLocation] = useState({
        top:'0px',
        left:'0px'
    });

    const handleClick = ()=>{
        setShowMenu(false);
    }
    const handleContextMenu = (e) => {
        if(!isFormat?.current) return;
        setSelection(editor.selection);
        e.preventDefault();
        setShowMenu(true);
        const xPos = e.clientX  + "px";
        const yPos = e.clientY  + "px";
        setMenuLocation({
            top:yPos,
            left:xPos
        })
    }
    useEffect(()=>{
        document.addEventListener('click',handleClick);
        document.addEventListener('contextmenu',handleContextMenu);

        return ()=>{
            document.removeEventListener('click',handleClick);
            document.removeEventListener('contextmenu',handleContextMenu);
        }
    },[])

    return [showMenu,menuLocation];
}

export default useContextMenu;