import React, { useEffect, useState } from 'react'
import useContextMenu from '../../utils/customHooks/useContextMenu.js';
import Icon from '../../common/Icon.jsx'
// import './styles.css'
import { TableUtil } from '../../utils/table.js'
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

const TableContextMenu = (props)=>{
    const {editor} = props;
    const [selection,setSelection] = useState()
    const [showMenu,{top,left}] = useContextMenu(editor,'table',setSelection);
    const table = new TableUtil(editor);


    const menu = [
        {
            icon:'insertColumnRight',
            text:'Insert Columns to the Right',
            action:{
                type:'insertColumn',
                position:'after'
            }
        },
        {
            icon:'insertColumnLeft',
            text:'Insert Columns to the Left',
            action:{
                type:'insertColumn',
                position:'at'
            }
        },
        {
            icon:'insertRowAbove',
            text:'Insert Row Above',
            action:{
                type:'insertRow',
                positon:'at'
            }
        },
        {
            icon:'insertRowBelow',
            text:'Insert Row Below',
            action:{
                type:'insertRow',
                position:'after'
            }
        },
        {
            icon:'trashCan',
            text:'Remove Table',
            action:{
                type:'remove'
            }
        }
    ]


    const handleInsert = ({type,position}) =>{
        Transforms.select(editor,selection)
        switch(type){
            case 'insertRow':
                table.insertRow(position);
                break;
            case 'insertColumn':
                table.insertColumn(position);
                break;
            case 'remove':
                table.removeTable();
                break;
            default:
                return;

        }
        ReactEditor.focus(editor);
    }

    return (
            showMenu && 
            <div className='contextMenu' style={{top,left}}>
                {
                    menu.map(({icon,text,action},index) => 
                        <div className='menuOption' key={index} onClick={() => handleInsert(action)}>
                            <Icon icon={icon}/>
                            <span>{text}</span>
                        </div>
                    )
                }
            </div> 
    )
}

export default TableContextMenu;