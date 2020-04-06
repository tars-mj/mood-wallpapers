import styled from 'styled-components';

const Modal = styled.div`
  z-index: 2;
  background-color: black;
  padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: grayscale(1) blur(2px);

  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Modal;
