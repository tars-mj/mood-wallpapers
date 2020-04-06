import styled from 'styled-components';

const StyledItemHover = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => '#000'};
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.25s ease-out;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.7;
  }
`;

export default StyledItemHover;
