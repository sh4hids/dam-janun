import qs from 'qs';
import * as types from './types';

export const getBookPrices = queries => ({
  type: types.FETCH_BOOK_PRICES,
  meta: {
    async: true,
    blocking: true,
    path: `/books/price?${qs.stringify(queries)}`,
    method: 'GET',
  },
});
