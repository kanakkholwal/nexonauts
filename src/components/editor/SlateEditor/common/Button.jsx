import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
padding: 0px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 4px;
color: rgb(33, 43, 54);
background: none;
border: none;
outline: none;
cursor: pointer;
height: 24px;
width: 28px;
margin:0 2px;
opacity:0.8;
&:hover,&.isActive{
opacity:1;
color:rgba(var(--theme-rgb),0.9)
}

`;



export default function AnyButton(props) {
    const { children, format, active, ...rest } = props
    return (
        <Button className={active ? 'isActive' : ''} title={format}  {...rest}>
            {children}
        </Button>
    )
}