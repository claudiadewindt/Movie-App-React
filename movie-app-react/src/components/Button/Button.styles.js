import styled from 'styled-components';

export const Wrapper = styled.button`
  display: block;
  background: var(--darkGrey);
  width: 10%;
  min-width: 200px;
  height: 50px;
  border-radius: 30px;
  color: var(--orange);
  border: none;
  font-size: var(--fontBig);
  margin: 20px auto;
  transition: all 0.3s;
  outline: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
