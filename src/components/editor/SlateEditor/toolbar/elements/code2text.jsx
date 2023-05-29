import React from 'react';
import Button from '../button';

import Icon from '../icons';
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