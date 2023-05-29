import { Transforms, Editor, Range, Element, Path } from 'slate'
import { getNode } from './SlateUtilityFunctions';

export class TableUtil{
    constructor(editor){
        this.editor = editor;
    }
    
    insertTable = (rows,columns)=>{
        
        const [tableNode] = Editor.nodes(this.editor,{
            match:n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table',
            mode:'highest',
        })
        
        if(tableNode) return;
        if(!rows || !columns){
            return;
        }
        //Creating a 2-d array of blank string as default text for the table
        const cellText = Array.from({ length: rows }, () => Array.from({ length: columns }, () => ""))
        const newTable = createTableNode(cellText,rows,columns);
        
        
        
        Transforms.insertNodes(this.editor,newTable,{
            mode:'highest'
        });
        Transforms.insertNodes(this.editor,{type:'paragraph',children:[{text:""}]},{mode:'highest'})
    }
    
    
    removeTable = () => {
        Transforms.removeNodes(this.editor,{
            match:n=> !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table',
            // mode:'highest'
        })
    }
    
    nextCell = (path) => {
        path[path.length - 2] ++;
        return path;
    }
    modifyCells = (action,format,position = 'at') => {
        const { selection } = this.editor;
        
        if(!!selection && Range.isCollapsed(selection)){
            const node = getNode(this.editor,format === 'row' ? 'table-row':'table-cell');
            if(node){
                const tableNode = getNode(this.editor,'table');
                let [{ rows:numberOfRows,columns:numberOfColumns }] = tableNode;
                
                if(((numberOfColumns === 1 && format === 'column') || (numberOfRows === 1 && format === 'row')) && action === 'remove'){
                    this.removeTable();
                    return;
                }
                
                const  [,currentPath] = node;
                const startPath = position === 'after' ? Path.next(currentPath) : currentPath;
                if(format === 'row'){
                    this.modifyRow(action,startPath,tableNode);
                } 
                else{
                    this.modifyColumn(action,startPath,tableNode);
                }
            }
        }
    }
    
    
    
    
    modifyRow = (action,path,tableNode)=>{
        const [{rows,columns},tablePath] = tableNode
        if(action === 'remove'){
            Transforms.removeNodes(this.editor,{at:path},{
                match:n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table-row',
            })
            
        }
        else{
            
            Transforms.insertNodes(this.editor,createRow(Array(columns).fill('')),{
                at:path,
            })
        }
        Transforms.setNodes(this.editor,{rows: action === 'remove' ? rows - 1 : rows + 1},
        {
            at:tablePath
        }
        );
    }
    modifyColumn = (action,startPath,tableNode)=>{
        const [{rows,columns},tablePath] = tableNode
        
        for(let counter= 0;counter<rows;counter++){

            if(action === 'remove'){
                Transforms.removeNodes(this.editor,{at:startPath},{
                    match:n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table-cell',
                    
                })    
            }
            else{
                
                Transforms.insertNodes(this.editor,createTableCell(''),{
                    at:startPath
                })
            }
            startPath = this.nextCell(startPath);
        }
        
        Transforms.setNodes(this.editor,{columns:action === 'remove' ? columns - 1 : columns + 1},
        {
            at:tablePath
        }
        );
    }
}



const createRow = (cellText)=>{
    const newRow = Array.from(cellText,(value)=> createTableCell(value));
    return {
        type:'table-row',
        children:newRow
    };
}

export const createTableCell = (text)=>{
    return {
        type:'table-cell',
        children:[ {
            type:'paragraph',
            children:[{text}]
        } ]
    }
}

const createTableNode = (cellText,rows,columns)=>{
    const tableChildren = Array.from( cellText,(value) => createRow(value))
    let tableNode = {
        type:'table',
        children:tableChildren,
        rows,
        columns,
        width:300,
        height:200
    }
    return tableNode;
}
