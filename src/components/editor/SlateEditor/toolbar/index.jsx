import { useState } from 'react';
import { useSlate } from 'slate-react';
import {
  toggleBlock,
  isMarkActive,
  isBlockActive,
  activeMark,
  addMarkData,
  toggleMark
} from "./utils/all";
import Options from "./options";
import { ToolBarWrapper, Span } from "./components";
import { Select } from "components/form-elements";
import Button from "./button";
import Icon from "./icons";
import LinkButton from "./elements/LinkButton";
import Id from "./elements/Id";
import ColorPicker from "./elements/color-picker";
import ImageInput from "./elements/image";
import VideoInput from "./elements/videoInput";
import TableInput from "./elements/table";
import TableContextMenu from "./elements/tableContextMenu";
// import CodeToTextButton from "./elements/code2text";
// import HtmlContextMenu from "./elements/htmlContextMenu";

export default function Toolbar() {
  const editor = useSlate();
  const [htmlAction, setHtmlAction] = useState({
    showInput: false,
    html: '',
    action: '',
    location: ''
  });
  const handleCodeToText = (partialState) => {
    setHtmlAction((prev) => ({
      ...prev,
      ...partialState
    }));
  };
  const BlockButton = ({ format }) => {
    return (
      <Button
        active={isBlockActive(editor, format)}
        format={format}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        <Icon icon={format} />
      </Button>
    );
  };

  const MarkButton = ({ format }) => {
    return (
      <Button
        active={isMarkActive(editor, format)}
        format={format}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <Icon icon={format} />
      </Button>
    );
  };

  const Dropdown = ({ format, options }) => {
    const handleChange = (value) => {
      addMarkData(editor, { format, value });
    };

    return (
      <Select
        value={activeMark(editor, format)}
        onChange={handleChange}
        size="sm"
        options={options}
      />
    );
  };

  return (
    <ToolBarWrapper>
      {Options.map((group, index) => (
        <Span key={index}>
          {group.map((element) => {
            switch (element.type) {
              case 'block':
                return <BlockButton key={element.id} format={element.format} />;
              case 'mark':
                return <MarkButton key={element.id} format={element.format} />;
              case 'link':
                return <LinkButton key={element.id} editor={editor} />;
              case 'id':
                return <Id key={element.id} editor={editor} />;
                {/* case 'dropdown':
                return <Dropdown key={element.id} {...element} />; */}
              case 'color-picker':
                return (
                  <ColorPicker
                    key={element.id}
                    format={element.format}
                    editor={editor}
                  />
                );
              case 'table':
                return (
                  <TableInput
                    key={element.id}
                    editor={editor}
                  />
                );
          
                  case 'image':
                    return <ImageInput key={element.id} editor={editor} />;
                 case 'video':
                    return <VideoInput key={element.id} editor={editor} />; 
           
                {/* case 'codeToText':
                return (
                  <CodeToTextButton
                    key={element.id}
                    handleButtonClick={handleCodeToText}
                  />
                ); */}
              default:
                return null;
            }
          })}
        </Span>
      ))}
     <TableContextMenu editor={editor} />
      {/* <HtmlContextMenu editor={editor} handleCodeToText={handleCodeToText} /> */}
     {/*   <EditableHtmlContextMenu
        editor={editor}
        handleCodeToText={handleCodeToText}
      /> */}
    </ToolBarWrapper>
  );
}
