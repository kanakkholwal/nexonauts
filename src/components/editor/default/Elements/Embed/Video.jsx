import React, { useEffect } from 'react'
import { useSelected, useFocused, useSlateStatic } from "slate-react";
import Icon from '../../common/Icon'
import useResize from '../../utils/customHooks/useResize.js'
import { Transforms } from 'slate';

// import "./Video.css";

const Video = ({ attributes, element, children }) => {
  
  const {url,alt,width,height} = element;
  const [size,onMouseDown,resizing] = useResize(width,height);
  const selected = useSelected();
  const focused = useFocused();
  const editor = useSlateStatic();
  
  useEffect(()=>{
    if(!resizing){
      selected && Transforms.setNodes(editor,{...size})
    }
  },[resizing])
  return (
    <div
    {...attributes}
    className='embed'
    style={{display:'flex',boxShadow: selected && focused &&  '0 0 3px 3px lightgray'}}
    {...element.attr}
    >
    <div contentEditable={false} style={{width:`${size.width}px`,height:`${size.height}px`}}>
    {
      // The iframe reloads on each re-render and hence it stutters and the document doesn't detect mouse-up event leading to unwanted behaviour
      // So during resize replace the iframe with a simple div
      resizing ?
      <div style={{width:'100%',height:'100%',border:'2px dashed black',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Icon icon='videoPlayer'/>
      </div> :
      <iframe src={url}  frameBorder="0" title={alt}/>
    }
    
    {
      selected &&
      <button className='resizeButton' onMouseDown={onMouseDown} style={{width:'15px',height:'15px',opacity:1,background:'transparent'}}><Icon icon='resize'/></button>
    }
    </div>
    {children}
    </div>
    );
  };
  export default Video;