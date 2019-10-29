import * as types from './types';

const initialState = {
  prices: [],
};

const bookReducers = function(state = initialState, { type, payload }) {
  switch (type) {
    case types.FETCH_BOOK_PRICES:
      return {
        ...state,
        isFetchingBookPrices: true,
        fetchBookPricesDone: false,
        fetchBookPricesFailed: false,
        prices: [],
      };
    case types.FETCH_BOOK_PRICES_DONE:
      return {
        ...state,
        isFetchingBookPrices: false,
        fetchBookPricesDone: true,
        fetchBookPricesFailed: false,
        prices: payload,
      };
    case types.FETCH_BOOK_PRICES_FAILED:
      return {
        ...state,
        isFetchingBookPrices: false,
        fetchBookPricesDone: false,
        fetchBookPricesFailed: true,
      };

    default:
      return state;
  }
};

export default bookReducers;
