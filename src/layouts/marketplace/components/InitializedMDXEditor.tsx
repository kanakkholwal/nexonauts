"use client"
// InitializedMDXEditor.tsx
import {
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  type MDXEditorMethods,
  type MDXEditorProps
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";





// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        linkPlugin(),
    linkDialogPlugin(),
    imagePlugin(),
        headingsPlugin(),
        tablePlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),


        toolbarPlugin({ toolbarContents: () => <div className="w-full flex items-center bg-slate-100">
              <UndoRedo />
        </div>}),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}