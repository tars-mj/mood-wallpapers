import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import PageTemplate from '../templates/PageTemplate';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import StyledItemHover from '../components/atoms/StyledItemHover';
import StyledMansoryItem from '../components/atoms/StyledMansoryItem';
import ButtonModal from '../components/atoms/ButtonModal';
import StyledInfo from '../components/atoms/StyledInfo';
import { theme } from '../theme/theme';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledDescription = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.brown3};
`;

const StyledMansory = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-auto-rows: 200px;
  grid-gap: 4px;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  justify-items: center;
  align-items: center;
`;

const SmallText = styled.div`
  font-size: 1.1rem;
`;

const Favorites = () => {
  const { tags, favorites, addToFavorites, removeFromFavorites } = useContext(DataContext);
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <PageTemplate>
      <StyledWrapper>
        {favorites.length === 0 ? (
          <StyledDescription>Your bookmark is empty!</StyledDescription>
        ) : (
          <StyledMansory>
            {favorites.map((x, i) => (
              <StyledMansoryItem
                isFavoritesView
                key={x.id}
                image={x.url}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <StyledItemHover isVisible={hoverIndex === i}>
                  <StyledInfo>
                    <ButtonModal
                      hearth
                      onClick={() =>
                        favorites.find((f) => f.id === x.id)
                          ? removeFromFavorites({ id: x.id })
                          : addToFavorites({
                              id: x.id,
                              url: x.url,
                              firstName: x.firstName,
                              lastName: x.lastName,
                              tags: tags,
                            })
                      }
                    >
                      <FontAwesomeIcon
                        size="1x"
                        color={theme.brown3}
                        icon={favorites.find((f) => f.id === x.id) ? faHeart : faHeartEmpty}
                      />
                    </ButtonModal>
                    {`${x.firstName} ${x.lastName}`}
                    <br />
                    <SmallText>{`${x.tags.join(', ')}`}</SmallText>
                  </StyledInfo>
                </StyledItemHover>
              </StyledMansoryItem>
            ))}
          </StyledMansory>
        )}
      </StyledWrapper>
    </PageTemplate>
  );
};

export default Favorites;
