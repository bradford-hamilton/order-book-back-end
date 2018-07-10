class OrderFormatter {
  static formatBittrex(orders) {
    return orders.map(order => {
      return {
        quantity: order.Quantity,
        rate: order.Rate,
        exchange: 'bittrex',
      }
    });
  }

  static formatPoloniex(orders) {
    return orders.map(([Rate, Quantity]) => {
      return {
        quantity: Quantity,
        rate: Number(Rate),
        exchange: 'poloniex',
      }
    });
  }

  static mergeAndSortOrders(bittrexOrders, poloniexOrders, type) {
    const merged = [
      ...this.formatBittrex(bittrexOrders),
      ...this.formatPoloniex(poloniexOrders),
    ];

    return type === 'bids' ?
      merged.sort((a, b) => b.rate - a.rate) :
      merged.sort((a, b) => a.rate - b.rate);
  }
}

export default OrderFormatter;
