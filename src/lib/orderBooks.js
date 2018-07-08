import axios from 'axios';
import { BITTREX_BASE_URL, POLONIEX_BASE_URL } from '../constants';

class OrderBooks {
  static getAll(marketPair) {
    return axios
      .all([
        this.getBittrexBook(marketPair),
        this.getPoloniexBook(marketPair)
      ])
      .then(axios.spread((bittrexBook, poloniexBook) => {
        return {
          bittrexBids: bittrexBook.data.result.buy,
          bittrexAsks: bittrexBook.data.result.sell,
          poloniexBids: this.formatPoloniexOrders(poloniexBook.data.bids),
          poloniexAsks: this.formatPoloniexOrders(poloniexBook.data.asks),
        };
      }))
      .catch(err => ({ message: `Error: ${err}` }));
  }

  static getBittrexBook(marketPair) {
    return axios.get(`${BITTREX_BASE_URL}${marketPair}`);
  }

  static getPoloniexBook(marketPair) {
    return axios.get(`${POLONIEX_BASE_URL}${marketPair.replace(/-/g, "_")}`);
  }

  static formatPoloniexOrders(orders) {
    return orders.map(([Rate, Quantity]) => ({ Quantity, Rate: Number(Rate) }));
  }
}

export default OrderBooks;
