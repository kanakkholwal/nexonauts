import  { forwardRef } from 'react';
import styled from "styled-components";
import dynamic from 'next/dynamic'
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});
const Wrapper = styled.div`
margin-block:0.75rem 1rem;
width:100%;
border-radius:0.75rem;
border:1px solid #eee;
`;
const MyEditor = forwardRef(({onChange,value}, ref) => {

    const editorConfig = {
        uploader: {
            insertImageAsBase64URI: true
        },
        useShadowDOM: true,
        spellcheck: true,
        // defaultMode: "1",
        // saveHeightInStorage: true,
        // saveModeInStorage: true,
        minHeight: 600,
        minWidth: 300,
        buttons:`source,|,bold,italic,underline,strikethrough,superscript,subscript,ul,ol,outdent,indent,font,fontsize,brush,paragraph,table,link,image,video,symbol,undo,redo,select-all,eraser,classSpan,lineHeight,file`,
        inline: true,
        toolbarInlineForSelection: true,
        showPlaceholder: false,
        showTooltip:true,
       

    };

    return (
        <Wrapper>
        <JoditEditor
            config={editorConfig}
            className="Post_Editor"
            ref={ref}
            value={value}            
            onChange={onChange}            
        />
        </Wrapper>
    );
});

export default MyEditor;
