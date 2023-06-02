export default function convertToHTML(value) {
  let html = '';

  value.forEach((node) => {
    html += convertNodeToHTML(node);
  });

  return html;
}

function convertNodeToHTML(node) {
  let html = '';

  if (node.type === 'paragraph') {
    html += '<p>';
    node.children.forEach((child) => {
      html += convertNodeToHTML(child);
    });
    html += '</p>';
  } else if (node.type === 'headingOne') {
    html += `<h1>${convertChildrenToHTML(node.children)}</h1>`;
  } else if (node.type === 'headingTwo') {
    html += `<h2>${convertChildrenToHTML(node.children)}</h2>`;
  } else if (node.type === 'headingThree') {
    html += `<h3>${convertChildrenToHTML(node.children)}</h3>`;
  } else if (node.type === 'blockquote') {
    html += `<blockquote>${convertChildrenToHTML(node.children)}</blockquote>`;
  } else if (node.type === 'alignLeft') {
    html += `<div style="display: flex; align-items: left; list-style-position: inside; flex-direction: column;">${convertChildrenToHTML(node.children)}</div>`;
  } else if (node.type === 'alignCenter') {
    html += `<div style="display: flex; align-items: center; list-style-position: inside; flex-direction: column;">${convertChildrenToHTML(node.children)}</div>`;
  } else if (node.type === 'alignRight') {
    html += `<div style="display: flex; align-items: flex-end; list-style-position: inside; flex-direction: column;">${convertChildrenToHTML(node.children)}</div>`;
  } else if (node.type === 'list-item') {
    html += '<li>';
    node.children.forEach((child) => {
      html += convertNodeToHTML(child);
    });
    html += '</li>';
  } else if (node.type === 'orderedList') {
    html += `<ol>${convertChildrenToHTML(node.children)}</ol>`;
  } else if (node.type === 'unorderedList') {
    html += `<ul>${convertChildrenToHTML(node.children)}</ul>`;
  } else if (node.type === 'link') {
    html += `<a href="${node.href}" target="${node.target}">${convertChildrenToHTML(node.children)}</a>`;
  } else if (node.type === 'table') {
    html += `<table style="width: ${node.width}px; height: ${node.height}px;">${convertChildrenToHTML(node.children)}</table>`;
  } else if (node.type === 'table-row') {
    html += `<tr>${convertChildrenToHTML(node.children)}</tr>`;
  } else if (node.type === 'table-cell') {
    html += `<td>${convertChildrenToHTML(node.children)}</td>`;
  } else if (node.type === 'image') {
    html += `<img src="${node.url}" alt="${node.alt}" style="width: ${node.width}px; height: ${node.height}px;" />`;
  } else if (node.type === 'video') {
    html += `<iframe src="${node.url}" title="${node.alt}" style="width: ${node.width}px; height: ${node.height}px;"></iframe>`;
  } else if (node.type === 'equation') {
    html += `<div data-math="${node.math}" data-inline="${node.inline}"></div>`;
  } else if (node.type === 'htmlCode') {
    html += `<div data-html-code="${node.html}"></div>`;
  } else if (node.type === 'editableHtmlCode') {
    html += `<div data-slate-object="${node.children}"></div>`;
  } else if (node.type === 'break') {
    html += '<br />';
  } else {
    html += convertChildrenToHTML(node.children);
  }

  return html;
}

function convertChildrenToHTML(children) {
  let html = '';

  if (children) {
    children.forEach((child) => {
      if (child.text) {
        html += convertMarkedToHTML(child);
      } else {
        html += convertNodeToHTML(child);
      }
    });
  }

  return html;
}


function convertMarkedToHTML(leaf) {
  let html = leaf.text;

  if (leaf.bold) {
    html = `<strong>${html}</strong>`;
  }

  if (leaf.code) {
    html = `<code>${html}</code>`;
  }

  if (leaf.italic) {
    html = `<em>${html}</em>`;
  }

  if (leaf.strikethrough) {
    html = `<span style="text-decoration: line-through;">${html}</span>`;
  }

  if (leaf.underline) {
    html = `<u>${html}</u>`;
  }

  if (leaf.superscript) {
    html = `<sup>${html}</sup>`;
  }

  if (leaf.subscript) {
    html = `<sub>${html}</sub>`;
  }

  if (leaf.color) {
    html = `<span style="color: ${leaf.color};">${html}</span>`;
  }

  if (leaf.bgColor) {
    html = `<span style="background-color: ${leaf.bgColor};">${html}</span>`;
  }

  if (leaf.fontSize) {
    const size = sizeMap[leaf.fontSize];
    html = `<span style="font-size: ${size};">${html}</span>`;
  }

  if (leaf.fontFamily) {
    const family = fontFamilyMap[leaf.fontFamily];
    html = `<span style="font-family: ${family};">${html}</span>`;
  }

  return html;
}
