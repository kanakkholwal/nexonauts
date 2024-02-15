"use client"
// MDXEditor.tsx
// import {
//   type MDXEditorMethods,
//   type MDXEditorProps,
// } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { CgSpinner } from "react-icons/cg";

// This is the only place InitializedMDXEditor is imported directly.
// const ForwardRefEditor = dynamic(() => import("./InitializedMDXEditor"), {
//   // Make sure we turn SSR off
//   ssr: false,
//   loading: () => <div className="w-full p-5 h-[20rem] rounded-xl bg-slate-100 flex items-center justify-center">

//         <CgSpinner className="animate-spin  h-10 w-10" size={32} />

//   </div>,
// });

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
// export const Editor = forwardRef<MDXEditorMethods, MDXEditorProps>(
//   (props, ref) => <ForwardRefEditor {...props} editorRef={ref} />,
// );

// TS complains without the following line
// Editor.displayName = "MDXEditor";