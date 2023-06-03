import styled from "styled-components";
import { LuMail } from "react-icons/lu";
import {Input,FormGroup ,FormHelper, FormElement} from "components/form-elements";
import {ResponsiveButton} from "components/buttons";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:auto;
    padding-inline:2rem;
    padding-block:4rem;
    text-align:center;
    margin-inline:auto;
    background-color:rgba(var(--secondary-rgb),0.05);
`;


export function PostPageHero({title,description}){

    return (
        <Wrapper>
            <h1>{title}</h1>
            <p>{description}</p>
        </Wrapper>
        )


}
export function HomePageHero(){

    return (
        <Wrapper>
            <h1 className="mb-2">Blog</h1>
            <p>Subscribe to learn about new product features, the latest in technology, solutions, and updates.</p>
            <FormElement  style={{
                maxWidth:"480px",
                margin:"1rem auto",
                gap:"0.5rem",
            }}>
            <FormGroup  style={{
                gap:"0.5rem",
                flexWrap:"nowrap",
            }}>
                <Input placeholder="Enter your email ..." noBorder="true"/>
                <ResponsiveButton icon={<LuMail/>} nature="secondary" low="true">
                    Subscribe
                </ResponsiveButton>
            </FormGroup>
                <FormHelper className="text-muted">
                    We respect your privacy. Unsubscribe at any time.
                </FormHelper>
            </FormElement>
        </Wrapper>
        )


}