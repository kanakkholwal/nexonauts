import { Transforms, Range } from "slate";

const createEquationNode = (math,inline) =>({
    type:'equation',
    inline,
    math,
    children:[{text:''}]
})

export const insertEquation = (editor,math,inline) =>{
    const equation = createEquationNode(math,inline);

    const {selection} = editor;
    if(!!selection){
        if(Range.isExpanded(selection)) Transforms.collapse(editor,{edge:'end'});

        Transforms.insertNodes(editor,equation,{select:true})
    }


    
}