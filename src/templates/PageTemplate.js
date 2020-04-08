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
  height: 99vh;
  display: grid;

  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 60px minmax(0, 1fr);
  grid-template-areas:
    'menu'
    'main';
  grid-gap: 4px;
  background-color: ${({ theme }) => theme.brown1};
`;

const StyledMenu = styled.div`
  grid-area: menu;
  background-color: ${({ theme }) => theme.brown1};
  display: grid;
  grid-template-columns: 60px 60px minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  grid-template-areas: 'btn1 btn2 tags';
`;

const ButtonMenu = styled.div`
  grid-area: ${({ area }) => area || 'btn1'};
  width: 100%;
  height: 100%;

  display: grid;
  font-size: 3rem;

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

const Badge = styled.div`
  position: absolute;
  width: 25px;
  height: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.red};
  top: 5px;
  right: 0px;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontBold};
  color: ${({ theme }) => theme.white};
  text-align: center;
  line-height: 1.7;
`;

const StyledTags = styled.div`
  grid-area: tags;
  display: flex;
  padding-right: 20px;
  color: ${({ theme }) => theme.brown3};
  justify-content: flex-end;
  align-items: center;
  text-transform: capitalize;
  font-family: 'Montserrat';
  font-style: italic;
`;

const PageTemplate = ({ children, location }) => {
  const { tags, favorites } = useContext(DataContext);

  return (
    <StyledBoardLayout>
      <StyledMenu>
        <ButtonMenu as={NavLink} to={routes.main} activeClassName="activeBtn" area="btn1">
          <FontAwesomeIcon color={theme.brown3} icon={faHome} />
        </ButtonMenu>
        <ButtonMenu as={NavLink} to={routes.favorites} activeClassName="activeBtn" area="btn2">
          {favorites.length !== 0 && <Badge>{favorites.length}</Badge>}
          <FontAwesomeIcon color={theme.brown3} icon={faHeart} />
        </ButtonMenu>
        <StyledTags>{tags.length === 0 ? '...' : tags.join(', ')}</StyledTags>
      </StyledMenu>
      {children}
    </StyledBoardLayout>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withRouter(PageTemplate);
