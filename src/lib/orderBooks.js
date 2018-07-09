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
        const bittrexBids = OrderFormatter.bittrex(bittrexBook.data.result.buy);
        const bittrexAsks = OrderFormatter.bittrex(bittrexBook.data.result.sell);
        const poloniexBids = OrderFormatter.poloniex(poloniexBook.data.bids);
        const poloniexAsks = OrderFormatter.poloniex(poloniexBook.data.asks);
        const allBids = OrderFormatter.mergeAndSortBids(bittrexBids, poloniexBids);
        const allAsks = OrderFormatter.mergeAndSortAsks(bittrexAsks, poloniexAsks);

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
