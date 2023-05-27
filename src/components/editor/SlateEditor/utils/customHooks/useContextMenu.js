import { useState, useEffect } from 'react';
import useFormat from './useFormat.js';


//This hook returns should we show the custom context menu and where to show it.
const useContextMenu = (editor,format,setSelection) => {
    const isFormat = useFormat(editor,format);
    const [showMenu,setShowMenu] = useState(false);
    const [menuLocation,setMenuLocation] = useState({
        top:'0px',
        left:'0px'
    });

    const handleClick = ()=>{
        setShowMenu(false);
    }
    const handleContextMenu = (e) => {
        if(!isFormat) return;
        setSelection(editor.selection);
        e.preventDefault();
        setShowMenu(true);
        const xPos = e.pageX  + "px";
        const yPos = e.pageY  + "px";
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
    },[isFormat])

    return [showMenu,menuLocation];
}

export default useContextMenu;