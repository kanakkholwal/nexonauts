import styled from "styled-components";
import Footer from "components/footer";
import Link from "next/link";

const FooterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-block: 5rem 2rem;
    gap: 1rem;
    flex-wrap: wrap;
    width: 100%;
    max-width: var(--max-width);
    margin-inline: auto;
    padding:1rem;
    h2{
        text-align: center;      
        color: rgba(var(--text-rgb), 0.9);
    }
    &>div{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
        margin:1rem auto 3rem;
        
        a{
            border-radius: 10px;
            padding: 1rem 1.5rem;
            display: flex;
            gap: 1rem;
            font-weight: 600;
            align-items: center;
            border: 1px solid transparent;
            transition: all 300ms ease-in-out;

            &:hover {
                color: var(--theme);
                border: 1px solid var(--border-color);
                background:var(--card-bg);

                &>svg {
                    animation: rubberBand 1.2s ease;
                }
            }
        }
    }
`;


export default function FooterComponent({ socialMedia }) {
    return (
        <>
            <FooterWrapper>
                <h2>Follow Us on Social Media</h2>
                <div>
                    {socialMedia.map(({ name, icon, url }, index) => {
                        return (<Link href={url} target="_blank" className="icon" rel="noreferrer" key={index} title={name}>{icon} {name}</Link>)
                    })}
                </div>
            </FooterWrapper>
            <Footer />
        </>
    )
}