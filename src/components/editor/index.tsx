import { useEffect, useRef, useState } from "react";
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

// ... previous imports and type declarations

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
}: ArticleEditorProps) => {
  const editorJS = useRef<EditorJS | null>(null);
  const editorHolderId = `editorJs_${id}`;
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("Error: 'id' prop is required for ArticleEditor component.");
      return;
    }

    if (editorJS.current) {
      // editorJS.current.destroy();
      editorJS.current = null;
    }

    editorJS.current = new EditorJS({
      holder: editorHolderId,
      placeholder: placeholder || "Let's write an awesome story! ✨",
      readOnly: readOnly || false,
      minHeight: minHeight || 0,
      data: enableReInitialize ? value || defaultValue : defaultValue,
      i18n: i18n || {},
      tools: EditorTools || {},
      onChange: (api: API, event: CustomEvent) => {
        // Trigger onChange event only after the initial render
        if (!isInitialRender) {
          editorJS.current?.save().then((res) => {
            onSave(res);
          });
          if (onChange) {
            onChange(api, event);
          }
        }
      },
      onReady: () => {
        setIsInitialRender(false);
        onReady();
      },
    });

    // Cleanup logic if needed
    return () => {
      if (editorJS.current) {
        // editorJS.current.destroy();
        editorJS.current = null;
      }
    };

  }, [id]);

  useEffect(() => {
    if (editorJS.current !== null && (value || enableReInitialize)) {
      editorJS.current.isReady
        .then(() => {
          editorJS.current.render(value || defaultValue);
        })
        .catch((reason) => {
          console.log(`Editor.js initialization failed because of ${reason}`);
        });
    }
  }, [value, enableReInitialize]);

  return <div id={editorHolderId} />;
};

export default ArticleEditor;
