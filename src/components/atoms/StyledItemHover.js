import styled from 'styled-components';

const StyledItemHover = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${({ isVisible }) => (isVisible ? 'rgb(0,0,0, 1)' : 'rgb(0,0,0, 0)')};
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  transition: opacity 0.25s ease-out, background-color 0.25s ease-out;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.7;
  }
`;

export default StyledItemHover;
