import styled, { css } from 'styled-components';

const StyledMansoryItem = styled.div`
  width: 100%;
  height: 100%;
  background: center center no-repeat;
  background-size: cover;
  background-image: ${({ image }) => `url(${image})`};
  position: relative;

  ${({ isFavoritesView }) =>
    !isFavoritesView &&
    css`
      grid-auto-columns &:nth-child(1) {
        grid-area: a;
      }

      &:nth-child(2) {
        grid-area: b;
      }

      &:nth-child(3) {
        grid-area: c;
      }

      &:nth-child(4) {
        grid-area: d;
      }

      &:nth-child(5) {
        grid-area: e;
      }

      &:nth-child(6) {
        grid-area: f;
      }
    `}
`;

export default StyledMansoryItem;
