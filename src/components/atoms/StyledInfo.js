import styled from 'styled-components';

const StyledInfo = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.fontLight};
`;

export default StyledInfo;
