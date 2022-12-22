var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
export function disableScroll(element = window.document) {
    element.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    element.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    element.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    element.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
export function enableScroll(element = window.document) {
    element.removeEventListener('DOMMouseScroll', preventDefault, false);
    element.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    element.removeEventListener('touchmove', preventDefault, wheelOpt);
    element.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}