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
import axios from 'axios';

export const EditorTools = {
    header: {
        class: Header,
        config: {
            placeholder: "Let`s write an awesome story! ✨",
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
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                async uploadByFile(file) {


                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
                    formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER);


                    // upload image to cloudinary and get url
                    let output = {};
                    await axios(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                        method: 'POST',
                        data: formData
                    }).then((res) => {
                        const file = res.data;
                        console.log(file);

                        output = {
                            success: 1,
                            file: {
                                url: file.secure_url,
                                // any other image data you want to store, such as width, height, color, extension, etc
                            }
                        };
                    }).catch(err => {
                        console.log(err);
                        output = {
                            success: 0,
                            file: {
                                url: '',
                                // any other image data you want to store, such as width, height, color, extension, etc
                            }
                        }

                    })
                    return output;
                    // your own uploading logic here

                },

                /**
                 * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
                 * @param {string} url - pasted image URL
                 * @return {Promise.<{success, file: {url}}>}
                 */
                async uploadByUrl(url) {
                    // your ajax request for uploading
                    const formData = new FormData();
                    formData.append('file', url);
                    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
                    formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER);


                    let output = {};
                    await axios(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                        method: 'POST',
                        data: formData
                    }).then((res) => {
                        const file = res.data;
                        console.log(file);

                        output = {
                            success: 1,
                            file: {
                                url: file.secure_url,
                                // any other image data you want to store, such as width, height, color, extension, etc
                            }
                        };
                    }).catch(err => {
                        console.log(err);
                        output = {
                            success: 0,
                            file: {
                                url: '',
                                // any other image data you want to store, such as width, height, color, extension, etc
                            }
                        }

                    })
                    return output;
                }
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