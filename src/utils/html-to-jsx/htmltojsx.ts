'use strict';
import HTMLDOMPropertyConfig from 'react-dom-core/lib/HTMLDOMPropertyConfig';
import SVGDOMPropertyConfig from 'react-dom-core/lib/SVGDOMPropertyConfig';

type NodeType = {
    ELEMENT: number;
    TEXT: number;
    COMMENT: number;
};

const NODE_TYPE: NodeType = {
    ELEMENT: 1,
    TEXT: 3,
    COMMENT: 8
};

type AttributeMapping = { [key: string]: string };
const ATTRIBUTE_MAPPING: AttributeMapping = {
    'for': 'htmlFor',
    'class': 'className'
};

type ElementAttributeMapping = { [key: string]: { [key: string]: string } };
const ELEMENT_ATTRIBUTE_MAPPING: ElementAttributeMapping = {
    'input': {
        'checked': 'defaultChecked',
        'value': 'defaultValue'
    }
};

type SvgAttributeMapping = { [key: string]: string };
const SVG_ATTRIBUTE_MAPPING: SvgAttributeMapping = {
    'clip-path': 'clipPath',
    'fill-opacity': 'fillOpacity',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
};

const SVG_TAG_MAPPING: string[] = [
    'circle', 'defs', 'ellipse', 'g', 'line', 'linearGradient', 'mask',
    'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
    'stop', 'svg', 'text', 'tspan'
];
/**
 * 遇到 key 为这些标签的最外层需要用 value 对应的标签包裹, 但以下的标签除外, 不能搞
 * noframes, frame, frameset, html, head, body, script
 * @type {{thead: string, tbody: string, tfoot: string, caption: string, colgroup: string, col: string, tr: string, th: string, td: string, dt: string, dd: string}}
 */
var CONTAINER_MAPPING: Record<string, string> = {
    'thead': 'table',
    'tbody': 'table',
    'tfoot': 'table',
    'caption': 'table',
    'colgroup': 'table',
    'col': 'colgroup',
    'tr': 'tbody',
    'th': 'tr',
    'td': 'tr',
    'dt': 'dl',
    'dd': 'dl',
};


for (const propname in HTMLDOMPropertyConfig.Properties) {
    if (!HTMLDOMPropertyConfig.Properties.hasOwnProperty(propname)) {
        continue;
    }

    const mapFrom = HTMLDOMPropertyConfig.DOMAttributeNames[propname] || propname.toLowerCase();

    if (!ATTRIBUTE_MAPPING[mapFrom])
        ATTRIBUTE_MAPPING[mapFrom] = propname;
}

for (const propname in SVGDOMPropertyConfig.Properties) {
    if (!SVGDOMPropertyConfig.Properties.hasOwnProperty(propname)) {
        continue;
    }

    const mapFrom = SVGDOMPropertyConfig.DOMAttributeNames[propname] || propname.toLowerCase();

    if (!ATTRIBUTE_MAPPING[mapFrom])
        SVG_ATTRIBUTE_MAPPING[mapFrom] = propname;
}

function repeatString(string: string, times: number): string {
    if (times === 1) {
        return string;
    }
    if (times < 0) {
        throw new Error();
    }
    let repeated = '';
    while (times) {
        if (times & 1) {
            repeated += string;
        }
        if (times >>= 1) {
            string += string;
        }
    }
    return repeated;
}

function endsWith(haystack: string, needle: string): boolean {
    return haystack.slice(-needle.length) === needle;
}

function trimEnd(haystack: string, needle: string): string {
    return endsWith(haystack, needle)
        ? haystack.slice(0, -needle.length)
        : haystack;
}

function hyphenToCamelCase(string: string): string {
    return string.replace(/-(.)/g, (match, chr) => {
        return chr.toUpperCase();
    });
}

function isEmpty(string: string): boolean {
    return !/[^\s]/.test(string);
}

function isConvertiblePixelValue(value: string): boolean {
    return /^\d+px$/.test(value);
}

function isNumeric(input: any): boolean {
    return input !== undefined
        && input !== null
        && (typeof input === 'number' || parseInt(input, 10) == input);
}

class StyleParser {
    styles: { [key: string]: string };

    constructor(rawStyle: string) {
        this.parse(rawStyle);
    }

    parse(rawStyle: string): void {
        this.styles = {};
        rawStyle.split(';').forEach(style => {
            style = style.trim();
            const firstColon = style.indexOf(':');
            const key = style.substr(0, firstColon);
            const value = style.substr(firstColon + 1).trim();
            if (key !== '') {
                // Style key should be case insensitive
                const lowercaseKey = key.toLowerCase();
                this.styles[lowercaseKey] = value;
            }
        });
    }

    toJSXString(): string {
        const output: string[] = [];
        for (const key in this.styles) {
            if (this.styles.hasOwnProperty(key)) {
                output.push(this.toJSXKey(key) + ': ' + this.toJSXValue(this.styles[key]));
            }
        }
        return output.join(', ');
    }

    toJSXKey(key: string): string {
        // Don't capitalize -ms- prefix
        if (/^-ms-/.test(key)) {
            key = key.substr(1);
        }
        return hyphenToCamelCase(key);
    }

    toJSXValue(value: string): string {
        if (isNumeric(value)) {
            // If numeric, no quotes
            return value;
        } else if (isConvertiblePixelValue(value)) {
            // "500px" -> 500
            return trimEnd(value, 'px');
        } else {
            // Probably a string, wrap it in quotes
            return '\'' + value.replace(/'/g, '"') + '\'';
        }
    }
}
export type configType = {
    createClass: boolean;
    outputComponentName?: string;
    indent: '\t' | '  ';
    hideComment: boolean;
    createFunction: boolean;
}
const DEFAULT_CONFIG: configType = {
    indent: '\t',
    hideComment: false,
    createClass: false,
    createFunction: true,
    outputComponentName: 'MyNexoComponent',
};

export default function htmlToJsx(createElement: (tag: string) => Element): (config: any) => any {
    const tempEl = createElement('div');

    function escapeSpecialChars(value: string): string {
        tempEl.textContent = value;
        return tempEl.innerHTML;
    }

    return function HTMLtoJSX(config: configType) {
        config = { ...DEFAULT_CONFIG, ...config };
        if (config.createClass === undefined) {
            config.createClass = true;
        }
        if (config.outputComponentName && config.outputComponentName + '') {
            config.outputComponentName = config.outputComponentName.replace(/^\w/, s => s.toUpperCase());
        }
        if (!config.indent) {
            config.indent = '  ';
        }
        else if (config.indent === '\t') {
            config.indent = `\t`;
        }

        return class HTMLtoJSX {
            output: string;
            level: number;
            _inPreTag: boolean;

            constructor() {
                this.output = '';
                this.level = 0;
                this._inPreTag = false;
            }

            reset() {
                this.output = '';
                this.level = 0;
                this._inPreTag = false;
            }

            convert(html: string): string {
                this.reset();

                const containerEl = createElement(this._chooseContainer(html));
                containerEl.innerHTML = '\n' + this._cleanInput(html) + '\n';

                if (config.createFunction) {
                    this.output = 'function ' + config.outputComponentName + '() {\n';
                    this.output += config.indent + 'return (';
                }
                else if (config.createClass) {
                    if (config.outputComponentName) {
                        this.output = 'var ' + config.outputComponentName + ' = React.createClass({\n';
                    } else {
                        this.output = 'React.createClass({\n';
                    }
                    this.output += config.indent + ' render: function() {' + "\n";
                    this.output += config.indent + config.indent + ' return (';
                }


                if (this._onlyOneTopLevel(containerEl)) {
                    this._traverse(containerEl);
                } else {
                    this.output += config.indent + config.indent + config.indent;
                    this.level++;
                    this._visit(containerEl);
                }
                this.output = this.output.trim();
                if (config.createFunction) {
                    this.output += config.indent + ' );\n';
                    this.output += '}';
                }
                else if (config.createClass) {
                    this.output += config.indent + config.indent + ' );\n';
                    this.output += config.indent + ' }\n';
                    this.output += '});';
                }
                
                return this.output;
            }

            _chooseContainer(html: string): string {
                const regex = /<([^\s>]+)/;
                const match = (html || '').match(regex);

                return (match && CONTAINER_MAPPING[match[1]]) ? CONTAINER_MAPPING[match[1]] : 'div';
            }

            _cleanInput(html: string): string {
                html = html.trim();
                html = html.replace(/<script([\s\S]*?)<\/script>/g, '');
                return html;
            }

            _onlyOneTopLevel(containerEl: Element): boolean {
                if (
                    containerEl.childNodes.length === 1
                    && containerEl.childNodes[0].nodeType === NODE_TYPE.ELEMENT
                ) {
                    return true;
                }
                let foundElement = false;
                for (let i = 0, count = containerEl.childNodes.length; i < count; i++) {
                    const child = containerEl.childNodes[i];
                    if (child.nodeType === NODE_TYPE.COMMENT || child.nodeType === NODE_TYPE.ELEMENT) {
                        if (foundElement) {
                            return false;
                        } else {
                            foundElement = true;
                        }
                    } else if (child.nodeType === NODE_TYPE.TEXT && !isEmpty(child.textContent as string)) {
                        return false;
                    }
                }
                return true;
            }

            _getIndentedNewline(): string {
                return '\n' + repeatString(config.indent, this.level + (config.createClass ? 2 : -1));
            }

            _visit(node: any): void {
                this._beginVisit(node);
                this._traverse(node);
                this._endVisit(node);
            }

            _traverse(node: any): void {
                this.level++;
                for (let i = 0, count = node.childNodes.length; i < count; i++) {
                    this._visit(node.childNodes[i]);
                }
                this.level--;
            }

            _beginVisit(node: any): void {
                switch (node.nodeType) {
                    case NODE_TYPE.ELEMENT:
                        this._beginVisitElement(node);
                        break;
                    case NODE_TYPE.TEXT:
                        this._visitText(node);
                        break;
                    case NODE_TYPE.COMMENT:
                        this._visitComment(node);
                        break;
                    default:
                        console.warn('Unrecognised node type: ' + node.nodeType);
                }
            }

            _endVisit(node: any): void {
                switch (node.nodeType) {
                    case NODE_TYPE.ELEMENT:
                        this._endVisitElement(node);
                        break;
                    case NODE_TYPE.TEXT:
                    case NODE_TYPE.COMMENT:
                        break;
                }
            }

            _beginVisitElement(node: any): void {
                const tagName = node.tagName.toLowerCase();
                const attributes: string[] = [];
                for (let i = 0, count = node.attributes.length; i < count; i++) {
                    attributes.push(this._getElementAttribute(node, node.attributes[i]));
                }

                if (tagName === 'textarea') {
                    attributes.push('defaultValue={' + JSON.stringify(node.value) + '}');
                }
                if (tagName === 'style') {
                    attributes.push('dangerouslySetInnerHTML={{__html: ' + JSON.stringify(node.textContent) + ' }}');
                }
                if (tagName === 'pre') {
                    this._inPreTag = true;
                }

                this.output += '<' + tagName;
                if (attributes.length > 0) {
                    this.output += ' ' + attributes.join(' ');
                }
                if (!this._isSelfClosing(node)) {
                    this.output += '>';
                }
            }

            _endVisitElement(node: any): void {
                const tagName = node.tagName.toLowerCase();
                this.output = trimEnd(this.output, config.indent);
                if (this._isSelfClosing(node)) {
                    this.output += ' />';
                } else {
                    this.output += '</' + node.tagName.toLowerCase() + '>';
                }

                if (tagName === 'pre') {
                    this._inPreTag = false;
                }
            }

            _isSelfClosing(node: any): boolean {
                return !node.firstChild || node.tagName.toLowerCase() === 'textarea' || node.tagName.toLowerCase() === 'style';
            }

            _visitText(node: any): void {
                const parentTag = node.parentNode && node.parentNode.tagName.toLowerCase();
                if (parentTag === 'textarea' || parentTag === 'style') {
                    return;
                }

                let text = escapeSpecialChars(node.textContent);

                if (this._inPreTag) {
                    text = text
                        .replace(/\r/g, '')
                        .replace(/( {2,}|\n|\t|\{|\})/g, (whitespace: string) => {
                            return '{' + JSON.stringify(whitespace) + '}';
                        });
                } else {
                    text = text
                        .replace(/(\{|\})/g, (brace: string) => {
                            return '{\'' + brace + '\'}';
                        });
                    if (text.indexOf('\n') > -1) {
                        text = text.replace(/\n\s*/g, this._getIndentedNewline());
                    }
                }
                this.output += text;
            }

            _visitComment(node: any): void {
                if (config.hideComment) {
                    this.output = this.output.replace(/\s+$/, '');
                } else {
                    this.output += '{/*' + node.textContent.replace('*/', '* /') + '*/}';
                }
            }

            _getElementAttribute(node: any, attribute: any): string {
                switch (attribute.name) {
                    case 'style':
                        return this._getStyleAttribute(attribute.value);
                    default:
                        const tagName = node.tagName.toLowerCase();
                        let name =
                            (ELEMENT_ATTRIBUTE_MAPPING[tagName] &&
                                ELEMENT_ATTRIBUTE_MAPPING[tagName][attribute.name]) ||
                            ATTRIBUTE_MAPPING[attribute.name] ||
                            (-1 < SVG_TAG_MAPPING.indexOf(tagName) && SVG_ATTRIBUTE_MAPPING[attribute.name]) ||
                            attribute.name;
                        let result = name;

                        if (-1 < name.indexOf(':')) {
                            result = '';
                        } else if (isNumeric(attribute.value)) {
                            result += '={' + attribute.value + '}';
                        } else if (attribute.value.length > 0) {
                            result += '="' + attribute.value.replace(/"/gm, '&quot;') + '"';
                        }

                        return result;
                }
            }

            _getStyleAttribute(styles: string): string {
                const jsxStyles = new StyleParser(styles).toJSXString();
                return 'style={{' + jsxStyles + '}}';
            }
        };
    };
}
