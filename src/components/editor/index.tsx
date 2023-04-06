import { useEffect, useRef, useState, useId } from "react";

import EditorJS, { API, OutputData } from "@editorjs/editorjs";

import { EditorTools, i18n } from "./config";

type ArticleEditorProps = {
  defaultValue: OutputData;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: number;
  onReady: () => void;
  onSave: (data: OutputData) => void;
  onChange: (api: API, event: CustomEvent) => void;
};

const ArticleEditor = ({
  defaultValue,
  placeholder,
  readOnly,
  minHeight,
  onReady,
  onChange,
  onSave,
}: ArticleEditorProps) => {
  const id = useId();
  const editorJS = useRef<EditorJS | null>(null);
  const [currentArticle, setCurrentArticle] = useState<OutputData | null>(null);
  useEffect(() => {
    if (editorJS.current === null) {
      editorJS.current = new EditorJS({
        placeholder,
        readOnly,
        minHeight,
        holder: id,
        data: defaultValue,
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
          onReady();
        },
      });
    }
  });
  return <div id={id} />;
};

ArticleEditor.defaultProps = {
  placeholder: "Let's write an awesome story! ✨",
  readOnly: false,
  minHeight: 0,
};

export default ArticleEditor;