class OrderFormatter {
  static bittrex(orders) {
    return orders.map(order => {
      return {
        quantity: order.Quantity,
        rate: order.Rate,
        exchange: 'bittrex',
      }
    });
  }

  static poloniex(orders) {
    return orders.map(([Rate, Quantity]) => {
      return {
        quantity: Quantity,
        rate: Number(Rate),
        exchange: 'poloniex',
      }
    });
  }

  static mergeAndSortBids(bittrexBids, poloniexBids) {
    const merged = [...bittrexBids, ...poloniexBids];
    return merged.sort((a, b) => b.rate - a.rate);
  }

  static mergeAndSortAsks(bittrexAsks, poloniexAsks) {
    const merged = [...bittrexAsks, ...poloniexAsks];
    return merged.sort((a, b) => a.rate - b.rate);
  }
}

export default OrderFormatter;
