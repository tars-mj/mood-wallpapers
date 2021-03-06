import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import PageTemplate from '../templates/PageTemplate';
import styled from 'styled-components';
import axios from 'axios';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faImages,
  faSearch,
  faTimes,
  faHeart,
  faLocationArrow,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import { theme } from '../theme/theme';
import StyledItemHover from '../components/atoms/StyledItemHover';
import StyledMansoryItem from '../components/atoms/StyledMansoryItem';
import ButtonModal from '../components/atoms/ButtonModal';
import Modal from '../components/atoms/Modal';
import StyledInfo from '../components/atoms/StyledInfo';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledMansory = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 4px;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-rows: minmax(0, 1fr);
  grid-template-areas:
    'a b b c'
    'd d e c'
    'd d f f';
`;

const StyledWrapperInput = styled.div`
  width: 500px;
  display: flex;
`;

const StyledInput = styled.div`
  width: 400px;
`;

const ButtonAdd = styled.button`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.brown1};
  border: 5px solid ${({ theme }) => theme.brown2};
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0px 15px -2px hsla(0, 0%, 0%, 0.3);
  z-index: 1;
  &:focus {
    outline: none;
  }
  transition: transform 0.15s ease-out;
  &:hover {
    transform: scale(1.2);
  }
`;

const optionsSelect = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'night', label: 'Night' },
  { value: 'nature', label: 'Nature' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'sunny', label: 'Sunny' },
  { value: 'cloudy', label: 'Cloudy' },
  { value: 'rainy', label: 'Rainy' },
  { value: 'new_york', label: 'New York' },
  { value: 'dubai', label: 'Dubai' },
  { value: 'warsaw', label: 'Warsaw' },
  { value: 'australia', label: 'Australia' },
  { value: 'japan', label: 'Japan' },
];

const animatedComponents = makeAnimated();

const StyledDescription = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.brown3};
`;

//settings for Select options
const { Option } = components;
const IconOption = (props) => (
  <Option {...props}>
    {props.label.includes('@') && <FontAwesomeIcon size="xs" color="#000" icon={faLocationArrow} />}
    {props.label.includes('@') ? props.label.substr(1) : props.label}
  </Option>
);

// const getCurrentTime = () => {
//   const hour = new Date().getHours;
//   const timeOfDay = [
//     {
//       night: 0,
//       morning: 4,
//       afternoon: 12,
//       evening: 16,
//       night: 22,
//     },
//   ];
// };

const Home = () => {
  const {
    fetched,
    tags,
    favorites,
    addTags,
    addFetched,
    addToFavorites,
    removeFromFavorites,
  } = useContext(DataContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [options, setOptions] = useState(optionsSelect);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getLocation = await axios.get('https://geolocation-db.com/json/');
        const getWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${getLocation.data.city}&appid=d5cbcfaa770ee1e8c794f868ef0da232`,
        );

        const countryName = getLocation.data.country_name;
        const cityName = getLocation.data.city;
        let currentWeather = getWeather.data.weather[0].main;
        currentWeather = currentWeather === 'Clear' ? 'Sunny' : currentWeather;

        setOptions([
          { value: countryName, label: `@${countryName}` },
          { value: cityName, label: `@${cityName}` },
          { value: currentWeather, label: `@${currentWeather}` },
          ...optionsSelect,
        ]);
      } catch (e) {
        //temporary information for development
        console.log(e);
      }
    };
    fetchData();
  }, [fetched]);

  const getPhotos = () => {
    axios
      .get(
        `https://api.unsplash.com/photos/random/?client_id=sdmRXp3xwG4P52UxJ7ETIJBNJp5MCIrLogdUmIOqb6M&count=6&query=${tags.join(
          ',',
        )}`,
      )
      .then((response) => parseData(response))
      .then((parsed) => addFetched({ fetched: parsed }))
      .catch((error) => alert('Failed to load photos from Unsplash service'))
      .finally(() => setModalOpen(false));
  };

  const parseData = (data) => {
    if (data.status === 200) {
      let myData = [];
      data.data.forEach((x) => {
        myData.push({
          id: x.id,
          url: x.urls?.regular,
          firstName: x.user?.first_name,
          lastName: x.user?.last_name,
          tags: [...tags],
        });
      });
      return myData;
    }
  };

  const addTagsToState = (tags) => {
    tags = [...tags.flatMap((x) => x.value)];
    addTags({ tags });
  };

  return (
    <PageTemplate>
      <>
        <StyledWrapper>
          {fetched.length === 0 ? (
            <StyledDescription>Please, use photo icon on bottom to search photos</StyledDescription>
          ) : (
            <StyledMansory>
              {fetched.map((x, i) => (
                <StyledMansoryItem
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
                    </StyledInfo>
                  </StyledItemHover>
                </StyledMansoryItem>
              ))}
            </StyledMansory>
          )}
        </StyledWrapper>
        <ButtonAdd onClick={() => setModalOpen(true)}>
          <FontAwesomeIcon size="3x" color={theme.brown3} icon={faImages} />
        </ButtonAdd>
        {isModalOpen && (
          <Modal>
            <StyledWrapperInput>
              <StyledInput>
                <Select
                  onChange={(tags) => (tags ? addTagsToState(tags) : [])}
                  options={options}
                  isMulti
                  components={(animatedComponents, { Option: IconOption })}
                />
              </StyledInput>
              <ButtonModal onClick={() => getPhotos()}>
                <FontAwesomeIcon size="1x" color={theme.brown3} icon={faSearch} />
              </ButtonModal>
            </StyledWrapperInput>
            <ButtonModal close onClick={() => setModalOpen(false)}>
              <FontAwesomeIcon size="2x" color={theme.brown3} icon={faTimes} />
            </ButtonModal>
          </Modal>
        )}
      </>
    </PageTemplate>
  );
};

export default Home;
