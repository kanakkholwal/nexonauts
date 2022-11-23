import styled, { css } from 'styled-components'
import { colors, form } from "./variables";

export const FormElement = styled.div([`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 0.25rem auto;
    `])

export const Input = styled.input.attrs(props => ({
  type: 'text' || 'email' || 'number',
}))([`
letter-spacing: 0.1em;
width: 100%;
opacity: 0.95;
margin-bottom: 1.5rem;
font-weight: 600;

transition: all .2s linear;
border-radius: 0.25rem;
padding: calc(0.33rem + 1px) calc(0.75rem + 1px);
border: 2px solid ${form.FormBorder};
background: variables.$FormBg;
color: variables.$FormText;
caret-color: variables.$secondary;

&::placeholder {
  color: variables.$FormPlaceholder;
  opacity: 0.75;

}


&:focus {

  border-color: variables.$FormActive;
  opacity: 1;

  &::placeholder {
    color: variables.$FormPlaceholder;
    opacity: 1;
  }
}

&.checkValid:invalid,
&.isInvalid {
  border-color: variables.$danger-hvr !important;
  animation-name: invalid;
  animation-timing-function: variables.$transition;
  animation-duration: 500ms;
  animation-fill-mode: both;

}

&.checkValid:focus:not(:placeholder-shown):valid,
&.isValid {
  animation-name: valid;
  border-color: variables.$success-hvr !important;
  animation-timing-function: variables.$transition;
  animation-duration: 500ms;
  animation-fill-mode: both;
}

&.Form-lg {
  font-size: 1rem !important;
  line-height: 2.15 !important;
  padding-left: 0.75em !important;
  padding-right: 0.75em !important;
  border-radius: 0.25rem !important;
}

&.Form-sm {
  padding: 0.43em 0.99em 0.35em !important;
  font-size: .775rem !important;
  line-height: 1.6 !important;
  border-radius: 0.2rem !important;
}

`])


export const TextArea = styled.textarea([`
letter-spacing: 0.1em;
width: 100%;
opacity: 0.95;
margin-bottom: 1.5rem;
font-weight: 600;

transition: all .2s linear;
border-radius: 0.25rem;
padding: calc(0.33rem + 1px) calc(0.75rem + 1px);
border: 2px solid ${form.FormBorder};
background: variables.$FormBg;
color: variables.$FormText;
caret-color: variables.$secondary;

&::placeholder {
  color: variables.$FormPlaceholder;
  opacity: 0.75;

}


&:focus {

  border-color: variables.$FormActive;
  opacity: 1;

  &::placeholder {
    color: variables.$FormPlaceholder;
    opacity: 1;
  }
}


    `])

