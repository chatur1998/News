import { FETCH_NEWS,
         REFRESHED,
         BUTTON_PRESSED,
         SEARCH_PRESSED,
         SEARCH_TEXT,
         ITEM_PRESSED,
         CLOSE_MENU,
         CATEGORY_PRESSED,
        SET_LOADING } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  url: '',
  title: '',
  search: [],
  loading: false,
  query: '',
  string: ''
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action.payload);
  switch (action.type) {
   case FETCH_NEWS:
      return { ...state, data: action.payload };
    case REFRESHED:
        return { ...state, data: action.payload };
    case BUTTON_PRESSED:
      return { ...state, url: action.payload, title: action.title };
    case SEARCH_TEXT:
      return { ...state, query: action.payload };
    case SEARCH_PRESSED:
        return { ...state, search: action.payload, loading: true };
    case ITEM_PRESSED:
        return { ...state, search: action.payload };
    case CLOSE_MENU:
      return { ...state, string: action.payload };
    case CATEGORY_PRESSED:
        return { ...state, search: action.payload };
    case SET_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
