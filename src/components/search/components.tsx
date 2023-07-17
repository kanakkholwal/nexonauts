import styled from "styled-components";

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;
export const StyledHeading = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
    letter-spacing: 1px;
`;
export const StyledSubHeading = styled.h4`
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 20px;
    letter-spacing: 1px;
`;
export const StyledForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
    gap: 5px;
    
`;
export const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 1px;
`;
export const StyledButton = styled.button`
    flex: 1 1 auto;
    padding: 10px 12px;
    border:none;
    outline: none;
    border-radius: 5px;
    background-color: rgba(var(--theme-rgb), 1);
    color: #fff;
    font-size: 1rem;
    font-weight: 400;
    aspect-ratio: 1/1;
    svg{
        font-size: 1.2rem;
        height: 1.2rem;
    }    
`;