import styled from 'styled-components';

const FormAlert = styled.p`
font-weight: 500;
font-size: 75%;
margin-bottom: 0.25rem;
color: rgba(var(--${({ nature }) => nature || 'warning'}-rgb), 0.75);
`;
export default FormAlert;