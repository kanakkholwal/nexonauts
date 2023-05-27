import React, { useEffect, useState } from 'react'
import useContextMenu from '../../utils/customHooks/useContextMenu.js';
import Icon from '../../common/Icon.jsx'
import { Transforms, Editor, Element, Node, Path } from 'slate';

import styled from 'styled-components'

const ConTextMenu = styled.div`
    width: fit-content;
    height: fit-content;
    position: fixed;
    background: var(--card-bg,#fbfbfb);
    border-radius: 10px;
    display: flex;
    gap: 15px;
    flex-direction: column;
    cursor: pointer;
    padding:0.5rem;
    border-radius: 0.25rem;

`;

const Option = styled.div`
    display: flex;
    justify-content: space-between;
    padding-block: 0.5rem;
    padding-inline: 1.5rem;
    color: rgba(0, 0, 0, 0.87);
    transition: all 0.25s ease-in-out;
    opacity: 0.85;
    box-sizing: border-box;
    white-space: nowrap;
    border-radius: 6px;
    line-height: 1.57143;
    font-weight: 500;
    font-size: 0.875rem;
    text-transform: capitalize;
    width: 100%;
    cursor: pointer;
    margin: 0px 8px;
    
    &:is(:hover, :active ) {
      opacity:1;
      background:rgba(0,0,0,0.05);
    }

    &.isActive{
      color:var(--theme)
    }


    &:first-child {
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
    }

    &:last-child {
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
`;
const HtmlContextMenu = (props) => {
    const {editor,handleCodeToText} = props;
    const [selection,setSelection] = useState()
    const [showMenu,{top,left}] = useContextMenu(editor,'htmlCode',setSelection);

    const handleEditHtml = () => {
        Transforms.select(editor,selection);
        const parentPath = Path.parent(selection.focus.path)
        const htmlNode = Node.get(editor,parentPath);
        handleCodeToText({
            showInput:true,
            html:htmlNode.html,
            action:'update',
            location:selection
        });
    }

    return (
        showMenu &&
        <ConTextMenu style={{top,left}}>
            <Option onClick={handleEditHtml}>
                <Icon icon='pen' />
                <span>Edit HTML</span>
            </Option>
        </ConTextMenu>
    )
}

export default HtmlContextMenu;