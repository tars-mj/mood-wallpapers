import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
import { NavLink, withRouter } from 'react-router-dom';
import { routes } from '../routes';
import { DataContext } from '../context/DataContext';
import { theme } from '../theme/theme';

const StyledBoardLayout = styled.div`
  margin: 0;
  padding: 0 0 0 0;
  width: 100vw;
  height: 100vh;
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    'menu'
    'main';
  grid-gap: 10px;
  background-color: ${({ theme }) => theme.brown1};
`;

const StyledMenu = styled.div`
  grid-area: menu;

  background-color: ${({ theme }) => theme.brown1};
  display: grid;
  grid-template-columns: 60px 60px 300px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'btn1 btn2 search .';
`;

const ButtonMenu = styled.div`
  grid-area: ${({ area }) => area || 'btn1'};
  width: 100%;
  height: 100%;
  display: grid;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.brown1};
  position: relative;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    background-color: ${({ theme }) => theme.brown2};
  }
`;

// const badgeKeys = keyframes`
// 	0% {
//     transform: scale(1);
//   }

// 	50% {
// 		transform: scale(2);
// 	}

//   100% {
//     transform: scale(1);
//   }
// `;
// animation: ${badgeKeys} 0.3s ease-in-out;

const Badge = styled.div`
  position: absolute;
  width: 25px;
  height: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.red};
  top: 14px;
  left: 8px;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontBold};
  color: ${({ theme }) => theme.white};
  text-align: center;
  line-height: 1.7;

  @media (max-width: 768px) {
    top: 24px;
    left: 0px;
  }
`;

const PageTemplate = ({ children, location }) => {
  // const { pantry, shoppingList } = useContext(DataContext);

  return (
    <StyledBoardLayout>
      <StyledMenu>
        <ButtonMenu as={NavLink} to={routes.main} activeClassName="activeBtn" area="btn1">
          <FontAwesomeIcon color={theme.brown3} icon={faHome} />
        </ButtonMenu>
        <ButtonMenu as={NavLink} to={routes.favorites} activeClassName="activeBtn" area="btn2">
          <Badge>{2}</Badge>
          <FontAwesomeIcon color={theme.brown3} icon={faHeart} />
        </ButtonMenu>
      </StyledMenu>
      {children}
    </StyledBoardLayout>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withRouter(PageTemplate);
