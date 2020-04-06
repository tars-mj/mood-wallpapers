import React, { createContext, useReducer } from 'react';

export const DataContext = createContext();

// Initial state
const initialState = {
  isLoading: false,
  actual: [],
  favorites: [],
};

// Constants
const SET_LOADING = 'SET_LOADING';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

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
    default:
      throw new Error();
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const setLoading = ({ isLoading }) => {
    dispatch({ type: SET_LOADING, payload: { isLoading } });
  };

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

  return (
    <DataContext.Provider
      value={{
        isAuthorized: state.isAuthorized,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
