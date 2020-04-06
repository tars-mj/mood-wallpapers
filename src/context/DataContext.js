import React, { createContext, useReducer, useEffect } from 'react';

export const DataContext = createContext();

// Initial state
const initialState = () => {
  return {
    isLoading: false,
    fetched: JSON.parse(window.localStorage.getItem('fetched')) || [],
    tags: JSON.parse(window.localStorage.getItem('tags')) || [],
    favorites: JSON.parse(window.localStorage.getItem('favorites')) || [],
  };
};

// Constants
const SET_LOADING = 'SET_LOADING';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
const ADD_TAGS = 'ADD_TAGS';
const ADD_FETCHED = 'ADD_FETCHED';

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading };

    case ADD_TO_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites.filter((img) => img.id !== action.payload.id)],
      };

    case ADD_TAGS:
      return { ...state, tags: [...action.payload.tags] };
    case ADD_FETCHED:
      return { ...state, fetched: [...action.payload.fetched] };
    default:
      throw new Error();
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  // Actions
  const setLoading = ({ isLoading }) => dispatch({ type: SET_LOADING, payload: { isLoading } });

  const addToFavorites = ({ id, url, firstName, lastName, tags }) =>
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: {
        id,
        url,
        firstName,
        lastName,
        tags,
      },
    });

  const removeFromFavorites = ({ id }) =>
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: { id } });

  const addTags = ({ tags }) => dispatch({ type: ADD_TAGS, payload: { tags } });

  const addFetched = ({ fetched }) => dispatch({ type: ADD_FETCHED, payload: { fetched } });

  useEffect(() => {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem('tags', JSON.stringify(state.tags));
      window.localStorage.setItem('fetched', JSON.stringify(state.fetched));
      window.localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }
  }, [state.tags, state.fetched, state.favorites]);

  return (
    <DataContext.Provider
      value={{
        isAuthorized: state.isAuthorized,
        tags: state.tags,
        fetched: state.fetched,
        favorites: state.favorites,
        setLoading,
        addToFavorites,
        removeFromFavorites,
        addTags,
        addFetched,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
