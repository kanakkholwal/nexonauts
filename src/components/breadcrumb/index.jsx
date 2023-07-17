import Link from "next/link";
import {removeStringAfterWord} from "lib/scripts";
import styled from "styled-components";
import {GrFormNext} from "react-icons/gr";
import { useRouter } from "next/router";
import React from "react";

const BreadcrumbList = styled.div.attrs({
     itemScope:'itemscope',
     itemType:'https://schema.org/BreadcrumbList'
})`
display: flex;
align-items: center;
justify-content:flex-start;
gap:0.25rem;
overflow:hidden;
white-space:nowrap;
text-overflow:ellipsis;
padding:10px 15px;
margin-bottom:20px;
width:100%;
span,svg{
    flex:0 0 auto;
}
`;
const ItemListElement = styled.span.attrs({
        itemProp:'itemListElement',
        itemScope:'itemscope',
        itemType:'https://schema.org/ListItem'    
})`
display: flex;
align-items: center;
justify-content:flex-start;
`;
const Item = styled(Link).attrs({
    itemProp:'item',
    itemScope:'itemscope',
    itemType:'https://schema.org/Thing'
})`
display: flex;
align-items: center;
justify-content:flex-start;
text-decoration:none;
color:rgba(var(--muted-rgb),0.5);
text-transform:capitalize;
${({active}) =>{
    if(active === "true"){
        return `
        color:rgba(var(--muted-rgb),1);
        `
    }
}}
`;
const ItemName = styled.span.attrs({
    name:'name'
})`
display: flex;
align-items: center;
justify-content:flex-start;
`;
export function BreadCrumb(){
    const router = useRouter();
    const path = router.asPath.split('?')[0] || router.asPath;
    const pathArray = path.split('/');

    return (
        <BreadcrumbList>
        {pathArray.map((item,index,list)=>{
                if (index === 0) {
                    return <ItemListElement key={index}>
                        <Item href="/">
                            <ItemName>Home</ItemName>
                        </Item>
                    </ItemListElement>;
                }
                return (
                    <React.Fragment key={index}>
                        <GrFormNext/>
                        <ItemListElement key={index}>
                            <Item href={`${removeStringAfterWord(path,item)}`} active={index === (list.length - 1) ? "true" : "false"}>    
                                <ItemName>{item}</ItemName>
                            </Item>
                        </ItemListElement>
                    </React.Fragment>
                )
            })}
        </BreadcrumbList>
    )
}
export function BlogBreadCrumb({category,slug,title}){

    return (
        <BreadcrumbList style={{marginBottom:"0"}}>
            <ItemListElement>
                <Item href="/blog">
                    <ItemName>Blog</ItemName>
                </Item>
            </ItemListElement>
            <GrFormNext />
            <ItemListElement>
                <Item href={`/blog/labels/category`} active={"false"}>
                    <ItemName>{category}</ItemName>
                </Item>
            </ItemListElement>
            <GrFormNext />
            <ItemListElement>
                <Item href={`/blog/posts/${slug}`} active={"true"}>
                    <ItemName>{title}</ItemName>
                </Item>
            </ItemListElement>
        </BreadcrumbList>
    )
}