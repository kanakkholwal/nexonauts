import React from 'react';
import { MdFormatBold, MdFormatItalic, MdStrikethroughS, MdFormatUnderlined, MdFormatQuote, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight, MdFormatListNumbered, MdFormatListBulleted,MdInsertLink,MdVideoLibrary,MdImage,MdAdd,MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'
import { BsTypeH1, BsTypeH2, BsTypeH3, BsCameraVideoFill } from 'react-icons/bs'
import { FaSuperscript,FaSubscript } from 'react-icons/fa'
import { AiFillEdit,AiOutlineTable, AiOutlineInsertRowBelow, AiOutlineInsertRowRight,AiOutlineDelete, AiFillTag, AiOutlineUpload, AiOutlineArrowsAlt, AiOutlineInsertRowAbove, AiOutlineInsertRowLeft,AiFillHtml5 } from 'react-icons/ai'
import { SiLatex } from 'react-icons/si'
const iconList={
    bold:<MdFormatBold size={20}/>,
    italic:<MdFormatItalic size={20}/>,
    strikethrough:<MdStrikethroughS size={20}/>,
    underline:<MdFormatUnderlined size={20}/>,
    headingOne:<BsTypeH1 size={20}/>,
    headingTwo:<BsTypeH2 size={20}/>,
    headingThree:<BsTypeH3 size={20}/>,

    blockquote:<MdFormatQuote size={20}/>,
    superscript:<FaSuperscript size={15}/>,
    subscript:<FaSubscript size={15}/>,
    alignLeft:<MdFormatAlignLeft size={20}/>,
    alignCenter:<MdFormatAlignCenter size={20}/>,
    alignRight:<MdFormatAlignRight size={20}/>,
    orderedList:<MdFormatListNumbered size={20}/>,
    unorderedList:<MdFormatListBulleted size={20}/>,
    link:<MdInsertLink size={20}/>,
    image:<MdImage size={20}/>,
    video:<MdVideoLibrary size={20}/>,
    add:<MdAdd size={20}/>,
    table:<AiOutlineTable size={20}/>,
    insertRowBelow:<AiOutlineInsertRowBelow size={25}/>,
    insertColumnRight:<AiOutlineInsertRowRight size={25}/>,
    insertColumnLeft:<AiOutlineInsertRowLeft size={25}/>,
    insertRowAbove:<AiOutlineInsertRowAbove size={25}/>,
    trashCan:<AiOutlineDelete size={25}/>,
    addId:<AiFillTag size={20}/>,
    upload:<AiOutlineUpload size = {20}/>,
    equation:<SiLatex size={20} />,
    resize:<AiOutlineArrowsAlt size={20}/>,
    videoPlayer:<BsCameraVideoFill size={20}/>,
    insertHtml:<AiFillHtml5 size={20}/>,
    arrowRight:<MdArrowForward size={35}/>,
    pen:<AiFillEdit size={20}/>
}




const Icon = (props)=>{
    const {icon} = props
    return(
        iconList[icon]
    )
}

export default Icon;