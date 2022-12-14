import React from "react";
interface Window {
    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;
}

function TextArea({ children, ...props }): JSX.Element {
    const textAreaElement = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {

        var observe: (arg0: any, arg1: string, arg2: { (): void; (): void; (): void; (): void; (): void; }) => void;

        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };

        function init(item: HTMLTextAreaElement) {
            function resize() {
                item.style.height = 'auto';
                item.style.height = item.scrollHeight + 'px';
            }
            /* 0-timeout to get the already changed text */
            function delayedResize() {
                window.setTimeout(resize, 0);
            }
            observe(item, 'change', resize);
            observe(item, 'cut', delayedResize);
            observe(item, 'paste', delayedResize);
            observe(item, 'drop', delayedResize);
            observe(item, 'keydown', delayedResize);

            item.focus();
            item.select();
            resize();
        }

        if (textAreaElement.current) {
            textAreaElement.current.style.boxSizing = "border-box";
            var offset = textAreaElement.current.offsetHeight - textAreaElement.current.clientHeight;

            textAreaElement.current.addEventListener("input", (e) => {
                const target = e.target as unknown as HTMLTextAreaElement;
                // var offset = target.offsetHeight - target.clientHeight;

                target.style.maxHeight = "auto";
                target.style.height = 0 + "px";
                target.style.height = target.scrollHeight + offset + "px";

            });
            init(textAreaElement.current);

        }
    }, [textAreaElement.current?.value])

    return (
        <textarea {...props} ref={textAreaElement}>
            {children}
        </textarea>
    )
}
export default TextArea;