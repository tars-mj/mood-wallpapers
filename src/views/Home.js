import React, { useState } from 'react';
import PageTemplate from '../templates/PageTemplate';
import styled, { css } from 'styled-components';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../theme/theme';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledMansory = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: 80vh;
  margin-bottom: 5vh;
  text-align: center;
  text-transform: uppercase;
  width: 90vw;
`;

const StyledMansoryItem = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;

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

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const animatedComponents = makeAnimated();

const ButtonModal = styled.div`
  width: 36px;
  height: 36px;
  margin-left: 20px;
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

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tags, setTag] = useState([]);

  const getPhotos = () => {
    axios
      .get(
        'https://api.unsplash.com/photos/random/?client_id=sdmRXp3xwG4P52UxJ7ETIJBNJp5MCIrLogdUmIOqb6M&count=2&tags=[night]',
      )
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const addTag = (tags) => {
    console.log(tags);
    setTag(tags);
  };
  return (
    <PageTemplate>
      <>
        <StyledWrapper>
          <StyledMansory></StyledMansory>
        </StyledWrapper>
        <ButtonAdd onClick={() => setModalOpen(true)}>
          <FontAwesomeIcon size="3x" color={theme.brown3} icon={faImages} />
        </ButtonAdd>
        {isModalOpen && (
          <Modal>
            <StyledWrapperInput>
              <StyledInput>
                <Select
                  onChange={(tags) => (tags ? addTag([...tags.flatMap((x) => x.value)]) : [])}
                  options={options}
                  isMulti
                  components={animatedComponents}
                />
              </StyledInput>
              <ButtonModal onClick={() => setModalOpen(false)}>
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
