
export const getSiblings = (TargetNode) => [...TargetNode.parentNode.children].filter((siblings) => siblings !== TargetNode);

export function isElement(obj) {
    try {
        //Using W3 DOM2 (works for FF, Opera and Chrome)
        return obj instanceof HTMLElement;
    }
    catch (e) {
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have (works on IE7)
        return (typeof obj === "object") &&
            (obj.nodeType === 1) && (typeof obj.style === "object") &&
            (typeof obj.ownerDocument === "object");
    }
}
export const setAttributes = (TargetNode, Attributes) => {
    if (!isElement(TargetNode)) throw new Error(TargetNode + " must be an Html Element");
    if (!(typeof Attributes === "object")) throw new Error(Attributes + " must be HTML attribute Object");

    // Object.assign(TargetNode,Attributes)
    Object.keys(Attributes).forEach(attr => {
        TargetNode.setAttribute(attr, Attributes[attr]);
    });
}

export function GenerateId(length) {
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export function stringToHTML(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
};