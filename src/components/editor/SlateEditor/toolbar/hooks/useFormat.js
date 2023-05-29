import { useEffect, useState } from 'react';
import { Editor, Element } from 'slate'


// This hook returns if the node in the current selection matches the format passed to it.
const useFormat = (editor,format)=>{
    const [isFormat,setIsFormat] = useState(false);
    useEffect(()=>{
        if(editor.selection){
            // It matches at the editor.selection location by default, so if null handle it seperately.
            const [node] = Editor.nodes(editor,{
                match:n => !Editor.isEditor(n) && Element.isElement(n) && n.type === format
            })
            
            setIsFormat(!!node);
        }
        else{
            setIsFormat(false);
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[editor.selection])

    return isFormat;
}

export default useFormat;