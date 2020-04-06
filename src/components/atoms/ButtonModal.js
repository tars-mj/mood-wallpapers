import styled, { css } from 'styled-components';

const ButtonModal = styled.div`
  width: 36px;
  height: 36px;
  margin-left: ${({ hearth }) => hearth || '20px'};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.25s ease-in;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.brown2};
  }

  ${({ close }) =>
    close &&
    css`
      position: fixed;
      top: 20px;
      right: 20px;
    `}
`;

export default ButtonModal;
