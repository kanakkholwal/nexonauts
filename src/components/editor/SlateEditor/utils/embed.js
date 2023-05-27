import { Transforms} from 'slate';

import {createParagraph} from './paragraph'
export const createEmbedNode = (type,{url,alt}) =>({
    type,
    alt,
    url,
    children: [{text:""}]
});

export const insertEmbed = (editor,embedData,format) => {
    const {url} = embedData;
    if(!url) return;
    const embed = createEmbedNode(format,embedData);
    
    Transforms.insertNodes(editor,embed,{select:true});
    Transforms.insertNodes(editor,createParagraph(""))
}