import { combineReducers } from 'redux';
import { itemTypes } from '../constants/actionTypes';
import { arrayToObject } from '../utils/utils';

/* const initialState = {
  byId: {
    4: {
      id: 4,
      name: 'item name 1',
      description: 'item description 1',
      price: 30.5,
      user_id: 4,
      category_id: 2,
      created: '2015-08-05T08:40:51.620Z',
      updated: '2018-04-03T08:40:51.620Z',
    },
    8: {
      id: 8,
      name: 'item name 2',
      description: 'item description 2',
      price: 32.7,
      user_id: 18,
      category_id: 2,
      created: '2015-08-05T08:40:51.620Z',
      updated: '2018-04-03T08:40:51.620Z',
    },
  },
  /* allIds: [4, 8],
  isLoading: false,
  totalItems: 100,
  error: '',
}; */

const byId = (state = {}, action) => {
  switch (action.type) {
    case itemTypes.FETCH_ITEMS_SUCCESS:
      return arrayToObject(action.payload.items);
    case itemTypes.FETCH_ITEM_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    case itemTypes.ADD_ITEM_SUCCESS:
    case itemTypes.EDIT_ITEM_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    case itemTypes.DELETE_ITEM_SUCCESS:
      // delete item
      return state;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case itemTypes.ADD_ITEM_REQUEST:
    case itemTypes.DELETE_ITEM_REQUEST:
    case itemTypes.EDIT_ITEM_REQUEST:
    case itemTypes.FETCH_ITEMS_REQUEST:
      return true;

    case itemTypes.ADD_ITEM_SUCCESS:
    case itemTypes.DELETE_ITEM_SUCCESS:
    case itemTypes.EDIT_ITEM_SUCCESS:
    case itemTypes.FETCH_ITEMS_SUCCESS:
    case itemTypes.ADD_ITEM_FAILURE:
    case itemTypes.DELETE_ITEM_FAILURE:
    case itemTypes.EDIT_ITEM_FAILURE:
    case itemTypes.FETCH_ITEMS_FAILURE:
      return false;

    default:
      return state;
  }
};

const error = (state = '', action) => {
  switch (action.type) {
    case itemTypes.ADD_ITEM_FAILURE:
    case itemTypes.EDIT_ITEM_FAILURE:
    case itemTypes.DELETE_ITEM_FAILURE:
    case itemTypes.FETCH_ITEMS_FAILURE:
      return action.payload;
    case itemTypes.ADD_ITEM_REQUEST:
    case itemTypes.DELETE_ITEM_REQUEST:
    case itemTypes.EDIT_ITEM_REQUEST:
    case itemTypes.FETCH_ITEMS_REQUEST:
    case itemTypes.ADD_ITEM_SUCCESS:
    case itemTypes.EDIT_ITEM_SUCCESS:
    case itemTypes.FETCH_ITEMS_SUCCESS:
      return '';
    default:
      return state;
  }
};

const totalItems = (state = 0, action) => {
  switch (action.type) {
    case itemTypes.FETCH_ITEMS_SUCCESS:
      return action.payload.total_items;
    case itemTypes.ADD_ITEM_SUCCESS:
      return state + 1;
    case itemTypes.DELETE_ITEM_SUCCESS:
      return state - 1;
    default:
      return state;
  }
};

export default combineReducers({
  byId, totalItems, isLoading, error,
});

export const getItem = (state, id) => state.byId[id];

export const getItems = (state) => (state.byId
  ? Object.keys(state.byId).map((id) => state.byId[id])
  : {});
