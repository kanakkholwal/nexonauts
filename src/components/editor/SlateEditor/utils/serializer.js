import { Text } from 'slate';
import { getBlock, getMarked } from './SlateUtilityFunctions.js'
import ReactDOMServer from 'react-dom/server';

const { renderToStaticMarkup } = ReactDOMServer


export const serialize = node =>{
    if(Text.isText(node)){
        let string = getMarked(node,node.text);
        string = renderToStaticMarkup(string);
        return string
    }
    const children = node.children.map(n => serialize(n)).join('')

    let block = getBlock({children,element:node})
    block = renderToStaticMarkup(block) 
    
    return block
}



export const serializer = editorValue =>{
    if(editorValue.length > 0){
        return editorValue.map(n => serialize(n)).join('')
    }
}

export const deserializer = (body) => {
    console.log(body);
}