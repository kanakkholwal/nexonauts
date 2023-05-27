import React, { useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components'
import Button from 'components/buttons'
import {TextArea} from 'components/form-elements'

import Icon from '../../common/Icon'
import Interweave from 'interweave'
import { Transforms } from 'slate';
import { useSlateStatic } from 'slate-react';

const Wrapper = styled.div`
position: fixed;
display: flex;
align-items: center;
justify-content: center;
inset: 0px;
-webkit-tap-highlight-color: transparent;
background-color: rgba(33, 43, 54, 0.8);
height:100%;
width:100%;
z-index: 98;
`;
const InnerWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;
height:100%;
width:100%;
gap:0.5rem;
border-radius:1rem;
padding:1rem 0.25rem;
background-color: var(--card-bg,#fbfbfb);
box-shadow: rgba(145, 158, 171, 0.24) -40px 40px 80px -8px;
`;
const CodeToTextWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap:1rem;
`;
const CodeToText = (props)=>{

    const {html,action,location,handleCodeToText} = props
    const codeToTextRef = useRef();
    const wrapperRef = useRef();
    const id = useId()

    const editor = useSlateStatic();
    const checkClick = (e)=>{
        const clickedComponent = e.target;
            if(wrapperRef?.current?.contains(clickedComponent)&& !codeToTextRef?.current?.contains(clickedComponent)){
                let partialState = {
                    showInput:false
                }
                if(html){
                    partialState.html = action === 'update' ? '' : html 
                }
                handleCodeToText(partialState);
            }
    }
    useEffect(()=>{
        document.addEventListener('click',checkClick);
        return ()=>{
            document.removeEventListener('click',checkClick);
        }
    },[])

    const codeOnChange = async(e)=>{
        // e.preventDefault();
        handleCodeToText({html:e.target.value});
    }
    const addHtml = ()=>{
        if(html){

            if(action === 'update'){
                Transforms.setNodes(editor,{
                    html,
                },{
                    at:location
                })
                
            }
            else{
                Transforms.insertNodes(editor,{
                    type:'htmlCode',
                    html:html,
                    children:[{text:''}]
                },
                {
                    select:true
                })
                Transforms.insertNodes(editor,{type:'paragraph',children:[{text:''}]})
            }
        }
        handleCodeToText({
            showInput:false,
            html:''
        })
    }
    const clearHtml = ()=>{
        handleCodeToText({html:''});
    }
    return (
      <>

     
        <Wrapper ref={wrapperRef}>
           <InnerWrapper ref={codeToTextRef}>
                <CodeToTextWrapper>
                    <TextArea name="Code2Text" id={id} value={html} onChange={codeOnChange} placeholder='Write html here...'></TextArea>
                    <div className="d-flex align-items-baseline justify-content-center">
                        <Icon icon='arrowRight'/>
                    </div>
                   <div>
                        <Interweave content={html}/>
                    </div>
                </CodeToTextWrapper>
                <div>
                    <Button size="sm" nature="success" low="true" level="true" onClick={addHtml}>Done</Button>
                    <Button size="sm" nature="danger" low="true" level="true" onClick={clearHtml}>Clear</Button>
                </div>
            </InnerWrapper>
        </Wrapper>
 
    </> )
}

export default CodeToText;