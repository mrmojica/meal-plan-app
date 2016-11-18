import styled from 'styled-components';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? '#91c5d4' : '#F2E9E1'};
  color: ${props => props.primary ? 'white' : '#66a9bd'};
  
  fontFamily: 'Delius Unicase', cursive;
  font-size: 1.5em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #66a9bd;
  border-radius: 3px;
`;

export default Button;
module.exports = Button;
