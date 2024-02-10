"use client";
import { JSDOM } from 'jsdom';
import htmlToJsx from './htmltojsx';

const window = new JSDOM().window;

const createElement = (tag: string): Element => {
    return window.document.createElement(tag);
};
export type { configType } from './htmltojsx';
export default htmlToJsx(createElement);