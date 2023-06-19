import styled from "styled-components";

export const FloatingMenu = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        position: fixed;
        z-index: 100;
        inset-inline: 0;
        bottom: 0;
        background:var(--card-bg);
    }
`;