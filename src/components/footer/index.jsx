import styled from "styled-components";
import Link from "next/link";
export const FooterWrapper = styled.footer`
width: 100%;
max-width: var(--max-width);
margin-inline: auto;
margin-top: 200px;
display: flex;
align-items: center;
justify-content: space-between;
gap: 1.5rem;
color: rgba(var(--text-rgb), 0.5);
padding: 1rem;
flex-wrap: wrap;
span{
    font-size: 1.7rem;
    font-weight: 600;
    display: inline-block;
}
ul{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.5rem;
    list-style: none;
    margin-inline-start:auto;
    @media (max-width: 768px) {
        margin-inline:auto;
    }


}
a{
    color: rgba(var(--text-rgb), 0.5);
    font-size: 1.7rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover {
        color:var(--text-muted)!important;
    }
}
@media (max-width: 768px) {
flex-direction: column;
text-align: center;
}
`;

export const Footer = () => (<FooterWrapper>
    <span>
        &copy; {new Date().getFullYear()} <Link href="/">K K UPGRADER</Link>. All Rights Reserved.
    </span>
    <ul>
        <li>
            <Link href="/privacy">Privacy Policy</Link>
        </li>
        <li>
            <Link href="/terms">Terms of Service</Link>
        </li>
        <li>
            <Link href="/contact">Contact Us</Link>
        </li>
        <li>
            <Link href="/about">About Us</Link>
        </li>
        <li>
            <Link href="/pricing">Pricing</Link>
        </li>
    </ul>
</FooterWrapper>)

