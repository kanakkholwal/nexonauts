import React from 'react';
import Icon from './icons';
import { Button } from './components';
import { EditorState, RichUtils } from 'draft-js';

const BoldButton = ({ editorState, setEditorState }) => {
    const handleButtonClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
        setEditorState(newEditorState);
    };

    return (
        <Button onClick={handleButtonClick}>
            <Icon icon="bold" />
        </Button>
    );
};

const ItalicButton = ({ editorState, setEditorState }) => {
    const handleButtonClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
        setEditorState(newEditorState);
    };

    return (
        <Button onClick={handleButtonClick}>
            <Icon icon="italic" />
        </Button>
    );
};

const UnderlineButton = ({ editorState, setEditorState }) => {
    const handleButtonClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
        setEditorState(newEditorState);
    };

    return (
        <Button onClick={handleButtonClick}>
            <Icon icon="underline" />
        </Button>
    );
};

const StrikethroughButton = ({ editorState, setEditorState }) => {
    const handleButtonClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH');
        setEditorState(newEditorState);
    };

    return (
        <Button onClick={handleButtonClick}>
            <Icon icon="strikethrough" />
        </Button>
    );
};
const MonospaceButton = ({ editorState, setEditorState }) => {
    const handleButtonClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'CODE');
        setEditorState(newEditorState);
    };

    return (
        <Button onClick={handleButtonClick} style={{ fontFamily: 'monospace' }}>
            <Icon icon="code" />

        </Button>
    );
};

const SuperscriptButton = ({ editorState, setEditorState }) => {
    const handleButtonClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'SUPERSCRIPT');
        setEditorState(newEditorState);
    };

    return (
        <Button onClick={handleButtonClick} style={{ verticalAlign: 'super', fontSize: 'smaller' }}>
            <Icon icon="superscript" />
        </Button>
    );
};

const SubscriptButton = ({ editorState, setEditorState }) => {
    const handleButtonClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'SUBSCRIPT');
        setEditorState(newEditorState);
    };

    return (
        <Button onClick={handleButtonClick} style={{ verticalAlign: 'sub', fontSize: 'smaller' }}>
            <Icon icon="subscript" />
        </Button>
    );
};

//   options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],


 const inlineCustomComponents = {
    bold: {
        component: BoldButton,
    },
    italic: {
        component: ItalicButton,
    },
    underline: {
        component: UnderlineButton,
    },
    strikethrough: {
        component: StrikethroughButton,
    },
    monospace: {
        component: MonospaceButton,
    },
    superscript: {
        component: SuperscriptButton,
    },
    subscript: {
        component: SubscriptButton,
    }
};
export default inlineCustomComponents;