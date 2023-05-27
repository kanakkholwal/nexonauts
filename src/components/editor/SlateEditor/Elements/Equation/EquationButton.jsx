import {useRef, useState} from 'react'
import Button from '../../common/Button'
import Icon from '../../common/Icon'
import usePopup  from '../../utils/customHooks/usePopup'
import {insertEquation} from '../../utils/equation.js'
import { Transforms } from 'slate'

const EquationButton = ({editor}) =>{
    const equationInputRef = useRef(null);
    const [showInput,setShowInput] = usePopup(equationInputRef)
    const [math,setMath] = useState('')
    const [displayInline,setDisplayInline] = useState(false);
    const [selection,setSelection] = useState();

    const toggleButton = ()=>{
        setShowInput(prev => !prev);
        setDisplayInline(false)
        setSelection(editor.selection);
    }

    const handleInputChange = ({target}) =>{
        if(target.type === 'checkbox'){
            setDisplayInline(prev => !prev);
        }
        else{
            setMath(target.value)
        }
    }   
    
    const handleAddEquation = ()=>{
        if(!math) return;
        selection && Transforms.select(editor,selection)
        insertEquation(editor,math,displayInline);
        console.log('btn click');
        setShowInput(false);
    }
    return(
        <div ref={equationInputRef} className='popup-wrapper' >
            <Button format='equation' onClick={toggleButton}>
                <Icon icon='equation'/>
            </Button>
            {
                showInput &&
                <div className='popup' >
                    <div style={{display:'flex',gap:'5px'}}>
                        <input type="text" value={math} onChange={handleInputChange} placeholder='Enter formula' />
                        <div onClick={handleAddEquation}><Icon icon='add'/></div>
                    </div>
                    <label >
                        <input type="checkbox" checked={displayInline} onChange={handleInputChange}/>
                        Inline Equation
                    </label>
                </div>
            }
        </div>
    )
}

export default EquationButton