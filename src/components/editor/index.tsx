import { useEffect, useRef, useState, useId } from "react";
// import Undo from 'editorjs-undo';
import EditorJS, { API, OutputData } from "@editorjs/editorjs";

import { EditorTools, i18n } from "./config";

type ArticleEditorProps = {
  defaultValue: OutputData;
  value?: OutputData;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: number;
  id: string;
  enableReInitialize?: boolean;
  onReady: () => void;
  onSave: (data: OutputData) => void;
  onChange?: (api: API, event: CustomEvent) => void;
};

const ArticleEditor = ({
  defaultValue,
  value,
  placeholder,
  readOnly,
  id,
  minHeight,
  enableReInitialize,
  onReady,
  onChange,
  onSave,
  ...props
}: ArticleEditorProps) => {
  const editorJS = useRef<EditorJS | null>(null);
  const [triggered, setTriggered] = useState<Boolean>(false);
  const [currentArticle, setCurrentArticle] = useState<OutputData | null>(defaultValue);

  useEffect(() => {
    if (editorJS.current === null) {
      editorJS.current = new EditorJS({
        placeholder,
        readOnly,
        minHeight,
        holder: "editorJs_" + id ? id : Math.random().toString(8),
        data: enableReInitialize ? value : defaultValue || currentArticle,
        i18n,
        tools: EditorTools,
        onChange(api: API, event: CustomEvent) {
          editorJS.current?.save().then((res) => {
            setCurrentArticle(res);
            onSave(res);
          });
          onChange(api, event);
        },
        onReady() {
          // new Undo({ editorJS });

          onReady();
        },
      });
    }

    // return () => {
    //   editorJS.current = null

    // }

  }, []);

  useEffect(() => {
    if (editorJS.current === null)
      return
    if (value && enableReInitialize)
      editorJS.current?.isReady
        .then(() => {
          if (triggered === false) {
            editorJS.current.render(value);
            console.log("rerendered...");
            setTriggered(true);
          }
          /** Do anything you need after editor initialization */
        })
        .catch((reason) => {
          console.log(`Editor.js initialization failed because of ${reason}`)
        });




  }, [value]);

  return <div id={id} {...props} />;
};

ArticleEditor.defaultProps = {
  placeholder: "Let's write an awesome story! ✨",
  readOnly: false,
  minHeight: 0,
  enableReInitialize: false,

};

export default ArticleEditor;