import { createEditor } from 'slate';
import { withReact, ReactEditor } from 'slate-react';
import { createHTMLSerializer } from 'slate-html-serializer';

// Create a custom HTML serializer
const htmlSerializer = createHTMLSerializer({
  // Define custom rules to convert Slate.js nodes to HTML elements
  rules: [
    {
      serialize(obj, children) {
        if (ReactEditor.isEditor(obj)) {
          return <>{children}</>;
        }
        if (obj.type === 'paragraph') {
          return <p>{children}</p>;
        }
        // Add more rules for other node types as needed
      },
    },
  ],
});

// Function to convert Slate.js content to HTML
export function convertToHtml(content) {
  const editor = withReact(createEditor());
  editor.children = content;
  return htmlSerializer.serializeNode(editor, editor);
}
