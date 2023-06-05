import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

export const EditorTools = {
    header: {
        class: Header,
        config: {
            levels: [1,2, 3, 4,5,6], // Specify the available heading levels (h2, h3, h4)
          },
    },
    embed: Embed,
    table: Table,
    marker: Marker,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: {
        class: Image,
        config: {
            /**
             * Custom uploader
             */
            uploader: {
                /**
      * Custom uploader function to handle file uploads and convert to base64
      * @param {File} file - The selected image file
      * @returns {Promise<{success: number, file: {url: string}}>} - Promise containing the uploaded file URL
      */
                uploadByFile(file) {
                    return new Promise((resolve) => {
                        const reader = new FileReader();

                        reader.onload = (event: any) => {
                            const base64Data = event.target.result;

                            resolve({
                                success: 1,
                                file: {
                                    url: base64Data,
                                },
                            });
                        };

                        reader.readAsDataURL(file);
                    });
                },
            }
        }
    },
    // image: Image,
    raw: Raw,
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
};

export const i18n = {
    messages: {},
};