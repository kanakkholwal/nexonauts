
import { KitchenSinkToolbar } from '@mdxeditor/editor/plugins/toolbar/components/KitchenSinkToolbar';
import { directivesPlugin } from '@mdxeditor/editor/plugins/directives';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import { diffSourcePlugin } from '@mdxeditor/editor/plugins/diff-source';
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings';
import { frontmatterPlugin } from '@mdxeditor/editor/plugins/frontmatter';
import { linkPlugin } from '@mdxeditor/editor/plugins/link';
import { linkDialogPlugin } from '@mdxeditor/editor/plugins/link-dialog';
import { imagePlugin } from '@mdxeditor/editor/plugins/image';
import { tablePlugin } from '@mdxeditor/editor/plugins/table';
import { markdownShortcutPlugin } from '@mdxeditor/editor/plugins/markdown-shortcut';
import { codeBlockPlugin } from '@mdxeditor/editor/plugins/codeblock';
import { sandpackPlugin } from '@mdxeditor/editor/plugins/sandpack';
import { codeMirrorPlugin } from '@mdxeditor/editor/plugins/codemirror';
import { quotePlugin } from '@mdxeditor/editor/plugins/quote';
import { listsPlugin } from '@mdxeditor/editor/plugins/lists';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break';







const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig = {
    defaultPreset: 'react',
    presets: [
        {
            label: 'React',
            name: 'react',
            meta: 'live react',
            sandpackTemplate: 'react',
            sandpackTheme: 'light',
            snippetFileName: '/App.js',
            snippetLanguage: 'jsx',
            initialSnippetContent: defaultSnippetContent,
        },
    ],
};

const GenericDirectiveEditor = (props) => {
    const cb = useCodeBlockEditorContext()
    return (
        <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
            <textarea rows={3} cols={20} defaultValue={props.code} onChange={(e) => cb.setCode(e.target.value)} />
        </div>
    )
}
const CalloutDirectiveDescriptor = {
    name: 'callout',
    testNode(node) {
        return node.name === 'callout'
    },
    // set some attribute names to have the editor display a property editor popup.
    attributes: [],
    // used by the generic editor to determine whether or not to render a nested editor.
    hasChildren: true,
    Editor: GenericDirectiveEditor
}
export const plugins = [
    linkPlugin(),
    linkDialogPlugin(),
    headingsPlugin(),
    imagePlugin(),
    tablePlugin(),
    quotePlugin(),
    listsPlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
    frontmatterPlugin(),
    // directivesPlugin({ directiveDescriptors: [CalloutDirectiveDescriptor] }),
    codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
    sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
    codeMirrorPlugin({
        codeBlockLanguages: {
            js: 'JavaScript',
            css: 'CSS',
            html: 'HTML',
            sql: 'SQL',
            json: 'JSON',
            yaml: 'YAML',
            xml: 'XML',
            ts: 'TypeScript',
            tsx: 'TSX',
            md: 'Markdown',
            mdx: 'MDX',
            python: 'Python',
            go: 'Go',
            c: 'C',
            cpp: 'C++',
        }
    }),
    diffSourcePlugin({ diffMarkdown: 'An older version', viewMode: 'rich-text' }),
    toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
];