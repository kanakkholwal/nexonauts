import React, { useEffect, useState } from 'react';
import {useSlate} from 'slate-react'
import {Range} from 'slate'
import Button from '../common/Button'
import Icon from '../common/Icon'
import { toggleBlock, toggleMark, isMarkActive, addMarkData, isBlockActive,activeMark} from '../utils/SlateUtilityFunctions.js'
import useFormat from '../utils/customHooks/useFormat.js'
import defaultToolbarGroups from './toolbarGroups.js'
// import './styles.css'
import ColorPicker from '../Elements/Color Picker/ColorPicker'
import LinkButton from '../Elements/Link/LinkButton'
import Embed from '../Elements/Embed/Embed'
import TableSelector from '../Elements/Table/TableSelector'
import EquationButton from '../Elements/Equation/EquationButton'
import Id from '../Elements/ID/Id'
import TableContextMenu from '../Elements/TableContextMenu/TableContextMenu'
import CodeToTextButton from '../Elements/CodeToText/CodeToTextButton'
import HtmlContextMenu from '../Elements/CodeToText/HtmlContextMenu';
import styled from "styled-components";


const ToolbarWrapper = styled.div`
position: relative;
display: flex;
align-items: center;
flex-wrap:wrap;
gap:0.25rem;
padding:0.25rem;
`;
const Toolbar = (props)=>{
    const {handleCodeToText} = props
    const editor = useSlate();
    const isTable = useFormat(editor,'table');
    const [toolbarGroups,setToolbarGroups] = useState(defaultToolbarGroups);
    
    useEffect(()=>{
        // Filter out the groups which are not allowed to be inserted when a table is in focus.
        let filteredGroups = [...defaultToolbarGroups]
        if(isTable){
            filteredGroups = toolbarGroups.map(grp =>(
                grp.filter(element => (
                    //groups that are not supported inside the table
                    !['codeToText'].includes(element.type)
                ))
            ))
            filteredGroups = filteredGroups.filter(elem => elem.length)
        }
        setToolbarGroups(filteredGroups);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isTable])

    const BlockButton = ({format}) =>{
        return (
            <Button active={isBlockActive(editor,format)} format={format} onMouseDown={
                e=>{
                    e.preventDefault();
                    toggleBlock(editor,format)
                }
            }>
                <Icon icon={format}/>
            </Button>
        )
    }
    const MarkButton = ({format})=>{
        return(
            <Button active={isMarkActive(editor,format)} format={format} onMouseDown={
                e=>{
                    e.preventDefault();
                    toggleMark(editor,format)
                }
            }>
                <Icon icon={format}/>
            </Button>
        )
    }
    const Dropdown = ({format,options}) => {
        return (
            <select value={activeMark(editor,format)} onChange = {e => changeMarkData(e,format)}>
                {
                    options.map((item,index) => 
                        <option key={index} value={item.value}>{item.text}</option>
                    )
                }
            </select>
        )
    }
    const changeMarkData = (event,format)=>{
        event.preventDefault();
        const value =event.target.value
        addMarkData(editor,{format,value})
    }

    return(
        <ToolbarWrapper>
            {
                toolbarGroups.map((group,index) => 
                    <span key={index}>
                        {
                            group.map((element,index) => 
                                {
                                    switch (element.type) {
                                        case 'block' :
                                            return <BlockButton key={index} {...element}/>
                                        case 'mark':
                                            return <MarkButton key={index} {...element}/>
                                        case 'dropdown':
                                            return <Dropdown key={index} {...element} />
                                        case 'link':
                                            return <LinkButton key={index} active={isBlockActive(editor,'link')} editor={editor}/>
                                        case 'embed':
                                            return <Embed key={index} format={element.format} editor={editor} />
                                        case 'color-picker':
                                            return <ColorPicker key={index} activeMark={activeMark} format={element.format} editor={editor}/>
                                        case 'table':
                                            return <TableSelector key={index} editor={editor}/>
                                        case 'id':
                                            return <Id editor={editor}  key={index} />
                                        case 'equation':
                                            return <EquationButton editor={editor} key={index} />
                                        case 'codeToText':
                                            return <CodeToTextButton handleButtonClick={handleCodeToText}  key={index} />
                                        default:
                                            return null
                                    }
                                }
                            )
                        }
                    </span>    
                )
            }
            <TableContextMenu editor={editor}/>
            <HtmlContextMenu editor={editor} handleCodeToText={handleCodeToText} />
        </ToolbarWrapper>
    )
}

export default Toolbar;