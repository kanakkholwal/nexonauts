import { Editor, Transforms, Range, Element } from 'slate';

export const createLinkNode = (href, showInNewTab, text) => ({
  type: 'link',
  href,
  target: showInNewTab ? '_blank' : '_self',
  children: [{ text }],
});

export const insertLink = (editor, { url, showInNewTab }) => {
  if (!url) return;

  const { selection } = editor;
  const isCollapsed = Range.isCollapsed(selection);

  // Remove existing link if the selection is inside a link
  if (isCollapsed) {
    const [linkNode] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    });

    if (linkNode) {
      Transforms.unwrapNodes(editor, {
        at: linkNode[1],
      });
    }
  }

  const link = createLinkNode(url, showInNewTab, 'Link');

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    const [start, end] = Range.edges(selection);
    const isLink = Editor.isEditor(selection.anchor.path);

    if (isLink) {
      // If the selected content is already a link, remove the link and wrap it with the new link
      Transforms.unwrapNodes(editor, {
        at: selection,
      });
      Transforms.wrapNodes(editor, link, { split: true });
    } else {
      // If the selected content contains a nested link, unwrap the nested link and wrap the outer content with the new link
      Transforms.wrapNodes(editor, link, { split: true, at: selection });
      Transforms.unwrapNodes(editor, {
        at: selection,
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
      });
    }

    Transforms.collapse(editor, { edge: end });
  }
};

export const removeLink = (editor) => {
  const { selection } = editor;
  if (Range.isCollapsed(selection)) {
    const [linkNode] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    });

    if (linkNode) {
      Transforms.unwrapNodes(editor, {
        at: linkNode[1],
      });
    }
  } else {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    });
  }
};
