import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FETCH_NEWS, BUTTON_PRESSED, SEARCH_PRESSED, SEARCH_TEXT, ITEM_PRESSED, CLOSE_MENU, CATEGORY_PRESSED, SET_LOADING } from './types';
import current from '../api/current';

export const fetchNews = () => {
  return async (dispatch) => {
    try {
      const response = await current.get('/top-headlines?country=in&pagesize=100');
      //console.log(response);
      dispatch({ type: FETCH_NEWS, payload: response });
  } catch (err) {
      Alert.alert('Something went wrong');
  }
};
};

export const refreshed = () => {
  return async (dispatch) => {
  try {
    const response = await current.get('/top-headlines?country=in&pagesize=100&sortBy=relevancy');
    //console.log(response);
    dispatch({ type: FETCH_NEWS, payload: response });
} catch (err) {
    Alert.alert('Something went wrong');
}
};
};

export const buttonPressed = (article) => {
  return (dispatch) => {
  dispatch({ type: BUTTON_PRESSED, payload: article.url, title: article.title });
    Actions.details();
};
};

export const searchText = (text) => {
    return {
      type: SEARCH_TEXT,
      payload: text
    };
};

export const searchPressed = (query) => {
  return async (dispatch) => {
    try {
      const response = await current.get(`/everything?q=${query}`);
      //console.log(response);
      dispatch({ type: SEARCH_PRESSED, payload: response });
      Actions.search();
  } catch (err) {
      Alert.alert('Something went wrong');
    }
  };
};

export const itemPressed = (name) => {
  return async (dispatch) => {
  try {
    const response = await current.get(`/top-headlines?country=${name}`);
    //console.log(response);
    dispatch({ type: ITEM_PRESSED, payload: response });
    Actions.search();
} catch (err) {
    Alert.alert('Something went wrong');
}
};
};

export const closeMenu = (string) => {
    return {
      type: CLOSE_MENU,
      payload: string
    };
};

export const categoryPressed = (cName, lan) => {
  return async (dispatch) => {
  try {
    const response = await current.get(`/top-headlines?country=${lan}&category=${cName}`);
    //console.log(response);
    dispatch({ type: CATEGORY_PRESSED, payload: response });
    Actions.search();
} catch (err) {
    Alert.alert('Something went wrong');
}
};
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
