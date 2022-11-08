import { useRef, useState } from 'react';
import './_SharePage.scss';
export default function SharePage({ size = 24, ...props }) {

    const [share, setShare] = useState(false);
    const CopyBtn = useRef(null);
    const Share = () => {
        if (typeof navigator.share === 'undefined') {
            console.log("No share API available!");
            setShare(true);
        } else {
            navigator.share({
                url: document.URL,
                title: document.title,
                text: document.description
            });
            setShare(false);

        }


    }
    const handleCopy = () => {
        const text = window.location.href;

        if (!navigator.clipboard) {
            const textarea = document.createElement("textarea");

            textarea.value = text;
            textarea.style.fontSize = "20px";
            document.body.appendChild(textarea);

            const range = document.createRange();
            range.selectNodeContents(textarea);

            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textarea.setSelectionRange(0, 999999);

            document.execCommand("copy");

            document.body.removeChild(textarea);
        }

        navigator.clipboard.writeText(text);
        CopyBtn.current.setAttribute("data-text", "Copied");
        setTimeout(() => {
            CopyBtn.current.setAttribute("data-text", "Copy Link");
        }, 800);

    }

    return (<>

        <span onClick={() => Share()} className="ShareBtn" title='Share this Page'>
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round"
                className="feather feather-share-2">
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
        </span>

        {
            share && <>
                <div className="ShareBackDrop">

                    <div className="ShareArea">
                        <div className="ShareModal">
                            <div className="ShareModalHeader" data-text="Share to other apps">
                                <span className="CloseBtn" aria-label="Close" onClick={() => setShare(false)}></span>
                            </div>
                            <div className="ShareModalBody">

                                <div data-text="Facebook">
                                    <a href={"https://www.facebook.com/sharer.php?u=" + window.location.href} rel="noreferrer" target="_blank">
                                        <svg viewBox="0 0 64 64"><path d="M20.1,36h3.4c0.3,0,0.6,0.3,0.6,0.6V58c0,1.1,0.9,2,2,2h7.8c1.1,0,2-0.9,2-2V36.6c0-0.3,0.3-0.6,0.6-0.6h5.6 c1,0,1.9-0.7,2-1.7l1.3-7.8c0.2-1.2-0.8-2.4-2-2.4h-6.6c-0.5,0-0.9-0.4-0.9-0.9v-5c0-1.3,0.7-2,2-2h5.9c1.1,0,2-0.9,2-2V6.2 c0-1.1-0.9-2-2-2h-7.1c-13,0-12.7,10.5-12.7,12v7.3c0,0.3-0.3,0.6-0.6,0.6h-3.4c-1.1,0-2,0.9-2,2v7.8C18.1,35.1,19,36,20.1,36z" /></svg>
                                    </a>
                                </div>
                                <div data-text="WhatsApp">
                                    <a aria-label="Whatsapp" href={"https://api.whatsapp.com/send?text=" + window.location.href} rel="noreferrer" target="_blank">
                                        <svg viewBox="0 0 64 64"><path d="M6.9,48.4c-0.4,1.5-0.8,3.3-1.3,5.2c-0.7,2.9,1.9,5.6,4.8,4.8l5.1-1.3c1.7-0.4,3.5-0.2,5.1,0.5 c4.7,2.1,10,3,15.6,2.1c12.3-1.9,22-11.9,23.5-24.2C62,17.3,46.7,2,28.5,4.2C16.2,5.7,6.2,15.5,4.3,27.8c-0.8,5.6,0,10.9,2.1,15.6 C7.1,44.9,7.3,46.7,6.9,48.4z M21.3,19.8c0.6-0.5,1.4-0.9,1.8-0.9s2.3-0.2,2.9,1.2c0.6,1.4,2,4.7,2.1,5.1c0.2,0.3,0.3,0.7,0.1,1.2 c-0.2,0.5-0.3,0.7-0.7,1.1c-0.3,0.4-0.7,0.9-1,1.2c-0.3,0.3-0.7,0.7-0.3,1.4c0.4,0.7,1.8,2.9,3.8,4.7c2.6,2.3,4.9,3,5.5,3.4 c0.7,0.3,1.1,0.3,1.5-0.2c0.4-0.5,1.7-2,2.2-2.7c0.5-0.7,0.9-0.6,1.6-0.3c0.6,0.2,4,1.9,4.7,2.2c0.7,0.3,1.1,0.5,1.3,0.8 c0.2,0.3,0.2,1.7-0.4,3.2c-0.6,1.6-2.1,3.1-3.2,3.5c-1.3,0.5-2.8,0.7-9.3-1.9c-7-2.8-11.8-9.8-12.1-10.3c-0.3-0.5-2.8-3.7-2.8-7.1 C18.9,22.1,20.7,20.4,21.3,19.8z" /></svg>
                                    </a>
                                </div>
                                <div data-text="Twitter">
                                    <a aria-label="Twitter" href={"https://twitter.com/share?url=" + window.location.href} rel="noreferrer" target="_blank">
                                        <svg viewBox="0 0 64 64"><path d="M11.4,26.6C11.5,26.6,11.5,26.6,11.4,26.6c-0.9,0-1.8-0.2-2.6-0.4c-1.3-0.4-2.5,0.8-2.1,2 c1.1,4.3,4.5,7.7,8.8,8.6c-1,0.3-2,0.4-3,0.4c-1,0-1.7,1.1-1.2,2c1.9,3.5,5.6,5.9,9.7,6h1c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2 c-1.3,0-2.9-0.1-4.5-0.5c-1-0.2-2-0.2-2.9,0.1c-1.7,0.6-3.5,1.1-5.4,1.3C8.5,50.2,8,50.7,8,51.4v0c0,0.5,0.3,1,0.8,1.2 c3.9,1.7,8.3,2.7,12.9,2.7c21.1,0,32.7-17.9,32.7-33.5v0c0-0.9,0.4-1.8,1.1-2.4c1.2-1,2.3-2.1,3.3-3.4c0.4-0.5-0.1-1.2-0.7-1 c-1.2,0.4-2.4,0.7-3.7,0.9c-0.2,0-0.3-0.2-0.1-0.4c1.5-1.1,2.8-2.6,3.6-4.3c0.3-0.6-0.3-1.2-0.9-0.9c-1.1,0.6-2.3,1-3.5,1.4 c-1.2,0.4-2.6,0.1-3.6-0.7c-1.9-1.5-4.4-2.4-7-2.4c-5.3,0-9.8,3.7-11.1,8.8c-0.2,0.9,0.5,1.7,1.4,1.7c1.6-0.1,3.2-0.3,4.4-0.5 c1-0.2,2,0.3,2.4,1.2c0.5,1.2-0.2,2.4-1.3,2.7c-4.6,1.3-9.7,0.4-9.7,0.4l0,0C21.2,21.8,14.3,18,9.3,12.5C8.6,11.7,7.3,12,7,12.9 c-0.4,1.2-0.6,2.5-0.6,3.9C6.4,20.9,8.4,24.5,11.4,26.6z" /></svg>
                                    </a>
                                </div>
                                <div data-text="Telegram">
                                    <a aria-label="Telegram" href={"https://t.me/share/url?url=" + window.location.href} rel="noreferrer" target="_blank">
                                        <svg viewBox="0 0 64 64"><path d="M56.4,8.2l-51.2,20c-1.7,0.6-1.6,3,0.1,3.5l9.7,2.9c2.1,0.6,3.8,2.2,4.4,4.3l3.8,12.1c0.5,1.6,2.5,2.1,3.7,0.9 l5.2-5.3c0.9-0.9,2.2-1,3.2-0.3l11.5,8.4c1.6,1.2,3.9,0.3,4.3-1.7l8.7-41.8C60.4,9.1,58.4,7.4,56.4,8.2z M50,17.4L29.4,35.6 c-1.1,1-1.9,2.4-2,3.9c-0.2,1.5-2.3,1.7-2.8,0.3l-0.9-3c-0.7-2.2,0.2-4.5,2.1-5.7l23.5-14.6C49.9,16.1,50.5,16.9,50,17.4z" /></svg>
                                    </a>
                                </div>
                                <div data-text="Pinterest">
                                    <a aria-label="Pinterest" data-pin-config="beside" href={"https://pinterest.com/pin/create/button/?url=" + window.location.href} rel="noreferrer" target="_blank">
                                        <svg viewBox="0 0 64 64"><path d="M14.4,53.8c2.4,2,6.1,0.6,6.8-2.4l0-0.1c0.4-1.8,2.4-10.2,3.2-13.7c0.2-0.9,0.2-1.8-0.1-2.7 C24.2,34,24,32.8,24,31.5c0-4.1,2.4-7.2,5.4-7.2c2.5,0,3.8,1.9,3.8,4.2c0,2.6-1.6,6.4-2.5,9.9c-0.7,3,1.5,5.4,4.4,5.4 c5.3,0,8.9-6.8,8.9-14.9c0-6.1-4.1-10.7-11.6-10.7c-8.5,0-13.8,6.3-13.8,13.4c0,2.4,0.7,4.2,1.8,5.5c0.5,0.6,0.6,0.9,0.4,1.6 c-0.1,0.5-0.4,1.8-0.6,2.2c-0.2,0.7-0.8,1-1.4,0.7c-3.9-1.6-5.7-5.9-5.7-10.7c0-8,6.7-17.5,20-17.5c10.7,0,17.7,7.7,17.7,16 c0,11-6.1,19.2-15.1,19.2c-1.9,0-3.8-0.7-5.2-1.6c-0.9-0.6-2.1-0.1-2.4,0.9c-0.5,1.9-1.1,4.3-1.3,4.9c-0.1,0.5-0.3,0.9-0.4,1.4 c-1,2.7,0.9,5.5,3.7,5.7c2.1,0.1,4.2,0,6.3-0.3c12.4-2,22.1-12.2,23.4-24.7C61.5,18.1,48.4,4,32,4C16.5,4,4,16.5,4,32 C4,40.8,8.1,48.6,14.4,53.8z" /></svg>
                                    </a>
                                </div>
                                <div data-text="LinkedIn">
                                    <a aria-label="Linkedin" href={"https://www.linkedin.com/sharing/share-offsite/?url=" + window.location.href} rel="noreferrer" target="_blank">
                                        <svg viewBox="0 0 64 64"><path d="M8,54.7C8,55.4,8.6,56,9.3,56h9.3c0.7,0,1.3-0.6,1.3-1.3V23.9c0-0.7-0.6-1.3-1.3-1.3H9.3 c-0.7,0-1.3,0.6-1.3,1.3V54.7z" /><path d="M46.6,22.3c-4.5,0-7.7,1.8-9.4,3.7c-0.4,0.4-1.1,0.1-1.1-0.5l0-1.6c0-0.7-0.6-1.3-1.3-1.3h-9.4 c-0.7,0-1.3,0.6-1.3,1.3c0.1,5.7,0,25.4,0,30.7c0,0.7,0.6,1.3,1.3,1.3h9.5c0.7,0,1.3-0.6,1.3-1.3V37.9c0-1,0-2,0.3-2.7 c0.8-2,2.6-4.1,5.7-4.1c4.1,0,6,3.1,6,7.6v15.9c0,0.7,0.6,1.3,1.3,1.3h9.3c0.7,0,1.3-0.6,1.3-1.3V37.4C60,27.1,54.1,22.3,46.6,22.3 z" /><path d="M13.9,18.9L13.9,18.9c3.8,0,6.1-2.4,6.1-5.4C19.9,10.3,17.7,8,14,8c-3.7,0-6,2.3-6,5.4 C8,16.5,10.3,18.9,13.9,18.9z" /></svg>
                                    </a>
                                </div>
                                <div data-text="Line">
                                    <a aria-label="Line" href={"https://timeline.line.me/social-plugin/share?url=" + window.location.href} rel="noreferrer" target="_blank">
                                        <svg viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
                                    </a>
                                </div>
                                <div data-text="Email">
                                    <a aria-label="Email" href={"mailto:?body=" + window.location.href} rel="noreferrer" target="_blank">
                                        <svg viewBox="0 0 500 500"><path d="M468.051,222.657c0-12.724-5.27-24.257-13.717-32.527 L282.253,45.304c-17.811-17.807-46.702-17.807-64.505,0L45.666,190.129c-8.448,8.271-13.717,19.803-13.717,32.527v209.054 c0,20.079,16.264,36.341,36.34,36.341h363.421c20.078,0,36.34-16.262,36.34-36.341V222.657z M124.621,186.402h250.758 c11.081,0,19.987,8.905,19.987,19.991v34.523c-0.088,4.359-1.818,8.631-5.181,11.997l-55.966,56.419l83.224,83.127 c6.904,6.904,6.904,18.081,0,24.985s-18.085,6.904-24.985,0l-85.676-85.672H193.034l-85.492,85.672 c-6.907,6.904-18.081,6.904-24.985,0c-6.906-6.904-6.906-18.081,0-24.985l83.131-83.127l-55.875-56.419 c-3.638-3.638-5.363-8.358-5.181-13.177v-33.343C104.632,195.307,113.537,186.402,124.621,186.402z" /></svg>
                                    </a>

                                </div>
                                <div data-text="Copy Link" ref={CopyBtn}>
                                    <span aria-label="Copy Link" onClick={() => handleCopy()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-copy"><rect x={9} y={9} width={13} height={13} rx={2} ry={2} /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                    </span>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        }

    </>)
}