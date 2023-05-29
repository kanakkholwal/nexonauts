import React from 'react';
import Button from '../../common/Button'
import Icon from '../../common/Icon'
const CodeToTextButton = (props) => {
    const {handleButtonClick} = props
    
    return (
        <>
            <Button format='insert Html' onClick={() => handleButtonClick({showInput:true,action:'insert'})}>
                <Icon icon='insertHtml'/>
            </Button>
        </>
    )
}

export default CodeToTextButton