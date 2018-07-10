import axios from 'axios';
import OrderFormatter from './orderFormatter';
import { BITTREX_BASE_URL, POLONIEX_BASE_URL } from '../constants';

class OrderBooks {
  static getAll(marketPair) {
    return axios
      .all([
        this.getBittrexBook(marketPair),
        this.getPoloniexBook(marketPair)
      ])
      .then(axios.spread((bittrexBook, poloniexBook) => {
        const allBids = OrderFormatter.mergeAndSortOrders(
          bittrexBook.data.result.buy,
          poloniexBook.data.bids,
          'bids',
        );
        const allAsks = OrderFormatter.mergeAndSortOrders(
          bittrexBook.data.result.sell,
          poloniexBook.data.asks,
          'asks',
        );

        return { allBids, allAsks };
      }))
      .catch(err => ({ message: `Error: ${err}` }));
  }

  static getBittrexBook(marketPair) {
    return axios.get(`${BITTREX_BASE_URL}${marketPair}`);
  }

  static getPoloniexBook(marketPair) {
    return axios.get(`${POLONIEX_BASE_URL}${marketPair.replace(/-/g, "_")}`);
  }
}

export default OrderBooks;
