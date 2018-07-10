import OrderFormatter from '../../../src/lib/orderFormatter';
import bittrexOrders from '../../fixtures/bittrexOrders';
import poloniexOrders from '../../fixtures/poloniexOrders';
import testHelpers from '../../test.setup';

testHelpers();

describe('OrderFormatter class', () => {
  describe('static #formatBittrex', () => {
    it('formats orders coming from bittrex correctly', () => {
      expect(OrderFormatter.formatBittrex(bittrexOrders)).to.eql([
        {
          exchange: 'bittrex',
          quantity: 2.72,
          rate: 0.0692,
        },
        {
          exchange: 'bittrex',
          quantity: 1.37,
          rate: 0.0691,
        },
        {
          exchange: 'bittrex',
          quantity: 0.71,
          rate: 0.069,
        },
      ]);
    });
  });

  describe('static #formatPoloniex', () => {
    it('formats orders coming from poloniex correctly', () => {
      expect(OrderFormatter.formatPoloniex(poloniexOrders)).to.eql([
        {
          exchange: 'poloniex',
          quantity: 12.34,
          rate: 0.0692521,
        },
        {
          exchange: 'poloniex',
          quantity: 8.12,
          rate: 0.06925209,
        },
        {
          exchange: 'poloniex',
          quantity: 4.67,
          rate: 0.069252,
        },
      ]);
    });
  });

  describe('static #mergeAndSortOrders', () => {
    it('merges and sorts bid orders from bittrex and poloniex correctly', () => {
      expect(OrderFormatter.mergeAndSortOrders(bittrexOrders, poloniexOrders, 'bids')).to.eql([
        {
          exchange: 'poloniex',
          quantity: 12.34,
          rate: 0.0692521,
        },
        {
          exchange: 'poloniex',
          quantity: 8.12,
          rate: 0.06925209,
        },
        {
          exchange: 'poloniex',
          quantity: 4.67,
          rate: 0.069252,
        },
        {
          exchange: 'bittrex',
          quantity: 2.72,
          rate: 0.0692,
        },
        {
          exchange: 'bittrex',
          quantity: 1.37,
          rate: 0.0691,
        },
        {
          exchange: 'bittrex',
          quantity: 0.71,
          rate: 0.069,
        },
      ]);
    });

    it('merges and sorts ask orders from bittrex and poloniex correctly', () => {
      expect(OrderFormatter.mergeAndSortOrders(bittrexOrders, poloniexOrders, 'asks')).to.eql([
        {
          exchange: 'bittrex',
          quantity: 0.71,
          rate: 0.069,
        },
        {
          exchange: 'bittrex',
          quantity: 1.37,
          rate: 0.0691,
        },
        {
          exchange: 'bittrex',
          quantity: 2.72,
          rate: 0.0692,
        },
        {
          exchange: 'poloniex',
          quantity: 4.67,
          rate: 0.069252,
        },
        {
          exchange: 'poloniex',
          quantity: 8.12,
          rate: 0.06925209,
        },
        {
          exchange: 'poloniex',
          quantity: 12.34,
          rate: 0.0692521,
        },
      ]);
    });
  });
});
