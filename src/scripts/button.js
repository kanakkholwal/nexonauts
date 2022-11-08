import { css } from 'styled-components';
import { btnCss } from "../pages/components/variables";

const btn = () => css`
     ${btnCss}
    font-family: variables.$buttonFontFamily;
    font-weight: 500;
    cursor: pointer;
    color: white;
    font-size: 1rem;
    background: variables.$primaryBg;
    color: variables.$primary;

    &[class^='btn-outline-'],
    &[class*=' btn-outline'] {
        background: none !important;
        border-width: 3px !important;
        border-style: solid !important;
        box-shadow: none !important;
        padding: calc(.625rem - 3px) 1.5rem calc(.5rem - 2px);

    }

    &.btn-primary {
        background: variables.$primaryBg;
        color: variables.$primary;
    }

    &.btn-outline-primary {
        border-color: variables.$primaryBg;
        color: variables.$primary;
    }

    &.btn-success {
        background: variables.$successBg;
        color: variables.$success;

    }

    &.btn-outline-success {
        border-color: variables.$successBg;
        color: variables.$success;

    }

    &.btn-danger {
        background: variables.$dangerBg;
        color: variables.$danger;
    }

    &.btn-outline-danger {
        border-color: variables.$dangerBg;
        color: variables.$danger;
    }

    &.btn-info {
        background: variables.$infoBg;
        color: variables.$info;
    }

    &.btn-outline-info {
        border-color: variables.$infoBg;
        color: variables.$info;
    }

    &.btn-secondary {
        background: variables.$secondaryBg;
        color: variables.$secondary;
    }

    &.btn-outline-secondary {
        border-color: variables.$secondaryBg;
        color: variables.$secondary;
    }

    &.btn-warning {
        background: variables.$warningBg;
        color: variables.$warning;
    }

    &.btn-outline-warning {
        border-color: variables.$warningBg;
        color: variables.$warning;
    }

    &.btn-dark {
        background: variables.$darkBg;
        color: variables.$dark;
        box-shadow: 7px 5px 20px 3px rgb(0 0 0 / 20%), -20px -17px 20px 3px rgb(0 0 0 / 10%);
    }

    &.btn-outline-dark {
        border-color: #111418;
        color: #a5b4ca;
    }



    &.btn-light {
        background: variables.$lightBg;
        color: variables.$light;
    }

    &.btn-outline-light {
        border-color: variables.$lightBg;
        color: variables.$lightBg;
    }


    &.btn-sm {
        padding: 0.375rem 1rem 0.3125rem;
        font-size: .75rem;
        line-height: 1.5;

        &.btn-circle {
            width: 1.8125rem;
            height: 1.8125rem;
        }
    }

    &.btn-block {
        width: 100%;
    }

    &.btn-lg {
        padding: 0.75rem 1.6875rem 0.6875rem;
        font-size: 1.5rem;
        line-height: 1.6;

        &.btn-circle {
            width: 2.8125rem;
            height: 2.8125rem;
        }
    }

    &.btn-rounded {
        border-radius: 50px;
    }

    &.btn-circle {
        padding: 0;
        justify-content: center;
        align-items: center;
        padding: 0;
        border-radius: 50% !important;
        width: 2.3125rem;
        height: 2.3125rem;
    }
`;



export default btn;