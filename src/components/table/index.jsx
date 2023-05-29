import styled from "styled-components";



export const Tr = styled.tr`
color: inherit;
display: table-row;
vertical-align: middle;
outline: 0px;
transition: all 0.25s ease-in-out;

`;
export const Th = styled.th.attrs({
    scope: "col"
})`
line-height: 1.5rem;
font-size: 0.875rem;
font-weight: 600;
display: table-cell;
vertical-align: inherit;
text-align: left;
padding: 16px;
border-bottom: none;
color: rgb(99, 115, 129);
background-color: rgb(244, 246, 248);
`;
export const Td = styled.td`
line-height: 1.57143;
font-size: 0.875rem;
font-weight: 500;
display: table-cell;
vertical-align: inherit;
text-align: left;
padding: 16px;
color: rgb(33, 43, 54);
border-bottom: none;
`;
export const Thead = styled.thead`
display: table-header-group;
box-sizing: inherit;
`;
export const Table = styled.table`
display: table;
width: 100%;
border-collapse: collapse;
border-spacing: 0px;
min-width: 800px;
box-sizing: border-box;
${({bordered}) =>{
    if(bordered === "true"){
        return `
        & ${Td},& ${Th},& td,& th{
        border: 1px solid rgba(var(--mute-rgb),0.5);
        padding: 0.25rem 0.5rem;
        display: table-cell;
vertical-align: inherit;
        }
        `
    }
}}
`;
export const TableContainer = styled.div`
overflow:auto;
position: relative;
word-wrap: break-word;
background: var(--card-bg);
box-shadow: var(--card-shadow);
--border-radius: 0.5rem;
border-radius: var(--border-radius,.5rem);
flex: 1 1 auto;
padding: .5rem;
overflow-x:auto;
-webkit-overflow-scrolling: touch;
 scroll-snap-type: x mandatory; 
 overflow-x: auto; 
scroll-behavior: smooth;

&::-webkit-scrollbar {
        display: none;
}

&:hover::-webkit-scrollbar {
        display: unset;
}
`;
export const Tbody = styled.tbody`
display: table-row-group;
box-sizing: inherit;
&>${Tr}{
    &:nth-child(odd){
        background:rgba(var(--theme-rgb),0.08);
        }
    &:hover{
        background:rgba(var(--muted-bg-rgb),0.3);
        }
}

`;