import { Editor, Transforms, Path, Range, Element } from 'slate';

export const createLinkNode = (href,showInNewTab,text) =>(
    {
        type:'link',
        href,
        target:showInNewTab ? '_blank': '_self',
        children:[{ text }]
    }
)

export const insertLink = (editor,{url,showInNewTab})=>{
    if(!url) return;

    const { selection } = editor;
    const link = createLinkNode(url,showInNewTab,'Link');
    if(!!selection){
        const [parent, parentPath] = Editor.parent(editor,selection.focus.path);
        if(parent.type === 'link'){
            removeLink(editor);
        }

        
        if(editor.isVoid(parent)){
            Transforms.insertNodes(editor, 
                {type:'paragraph',children:[link]},
                {
                    at:Path.next(parentPath),
                    select:true
                }

            )
        }
        else if(Range.isCollapsed(selection)){
            Transforms.insertNodes(editor,link, {select:true});
        }
        else{
            Transforms.wrapNodes(editor,link,
                {split:true}
            )

        }
    }
    else{
        Transforms.insertNodes(editor,{type:'paragraph',children:[link]})
    }
};

export const removeLink = (editor) =>{
    Transforms.unwrapNodes(editor,{
        match:n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link'
    })
};