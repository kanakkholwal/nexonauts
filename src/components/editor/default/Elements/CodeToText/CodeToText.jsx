import React, { useEffect, useRef } from 'react';
// import './CodeToText.css';
import Icon from '../../common/Icon';
import Interweave from 'interweave';
import { Transforms, Editor, Element } from 'slate';
import { useSlateStatic } from 'slate-react';
import ReactDOMServer from 'react-dom/server';
import { deserialize } from '../../utils/serializer';

const CodeToText = (props) => {
  let { html, action, location, handleCodeToText } = props;
  const codeToTextRef = useRef();
  const wrapperRef = useRef();

  const editor = useSlateStatic();
  const checkClick = (e) => {
    const clickedComponent = e.target;
    if (
      wrapperRef?.current?.contains(clickedComponent) &&
      !codeToTextRef?.current?.contains(clickedComponent)
    ) {
      let partialState = {
        showInput: false,
      };
      if (html) {
        partialState.html = action === 'update' ? '' : html;
      }
      handleCodeToText(partialState);
    }
  };
  useEffect(() => {
    document.addEventListener('click', checkClick);
    return () => {
      document.removeEventListener('click', checkClick);
    };
  }, []);

  const codeOnChange = async (e) => {
    // e.preventDefault();
    handleCodeToText({ html: e.target.value });
  };
  const getSlateData = () => {
    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <Interweave content={html} />
    );
    const body = new DOMParser().parseFromString(htmlString, 'text/html').body;
    const slateObj = deserialize(body);
    slateObj.push({
      type: 'paragraph',
      children: [{ text: '' }],
    });
    return [slateObj, htmlString];
  };
  const addHtml = (insertAs) => {
    if (html) {
      if (action === 'update') {
        const [[node, nodePath]] = Editor.nodes(editor, {
          at: location,
          mode: 'highest',
          match: (n) =>
            ['htmlCode', 'editableHtmlCode'].includes(
              !Editor.isEditor(n) && Element.isElement(n) && n.type
            ),
        });
        location = nodePath;
        Transforms.removeNodes(editor, {
          at: location,
          mode: 'highest',
          match: (n) =>
            ['htmlCode', 'editableHtmlCode'].includes(
              !Editor.isEditor(n) && Element.isElement(n) && n.type
            ),
        });
      }
      // console.log(html);
      if (insertAs === 'editable') {
        const [slateObj, htmlString] = getSlateData();
        Transforms.insertNodes(
          editor,
          {
            type: 'editableHtmlCode',
            children: slateObj,
            html: htmlString,
          },
          {
            select: true,
            at: location,
            mode: 'highest',
          }
        );
      } else {
        Transforms.insertNodes(
          editor,
          {
            type: 'htmlCode',
            html,
            children: [{ text: '' }],
          },
          {
            select: true,
            at: location,
            mode: 'highest',
          }
        );
      }
      Transforms.insertNodes(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
      });
    }
    handleCodeToText({
      showInput: false,
      html: '',
    });
  };
  const clearHtml = () => {
    handleCodeToText({ html: '' });
  };
  return (
    <div className="code-wrapper" ref={wrapperRef}>
      <div ref={codeToTextRef} className="codeToTextWrapper">
        <div className="codeToText">
          <textarea
            name=""
            id=""
            value={html}
            onChange={codeOnChange}
            placeholder="Write html here..."></textarea>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}>
            <Icon icon="arrowRight" />
          </div>
          <div className="textOutput">
            <Interweave content={html} />
          </div>
        </div>
        <div>
          <button onClick={() => addHtml('editable')} className="done">
            Save as Editable HTML
          </button>
          <button onClick={() => addHtml('raw')} className="done">
            Save as Raw HTML
          </button>
          <button className="clear" onClick={clearHtml}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeToText;
