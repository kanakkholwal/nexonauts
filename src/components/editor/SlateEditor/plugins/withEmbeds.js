import {Transforms, Path, Node} from 'slate'

const withEmbeds = (editor) =>{
    
    const { isVoid, insertBreak } = editor;

    editor.isVoid = (element) => ['video','image','htmlCode'].includes(element.type) ? true : isVoid(element);



    editor.insertBreak = (...args) => {
        const parentPath = Path.parent(editor.selection.focus.path);
        const parentNode = Node.get(editor, parentPath);
        // console.log(parentNode);
        if (editor.isVoid(parentNode)) {
          const nextPath = Path.next(parentPath);
          Transforms.insertNodes(
            editor,
            {
              type: 'paragraph',
              children: [{ text: '' }]
            }, 
            {
              at: nextPath,
              select: true // Focus on this node once inserted
            }
          );
        } else {
          insertBreak(...args);
        }
    }    
    return editor;
}


export default withEmbeds