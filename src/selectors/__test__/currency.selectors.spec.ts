import {
  selectCurrencyState,
  selectCurrencyLoading,
  selectAllCurrencies,
  selectCurrencyError,
  selectCurrenciesData,
  selectRatesData,
  selectRatesLoading,
  selectAllRates,
  selectRatesError,
} from '../currency.selectors';
import { GlobalState } from '../../interfaces/state.interfaces';


describe('menu.selector.ts', () => {
  const globalState: GlobalState = {
    currency: {
      currencies: {
        loading: false,
        data: {
          USD: 'US Dollar',
          EUR: 'Euro',
          PLN: 'Polish Zloty',
        },
        error: 'Currecy error',
      },
      rates: {
        loading: true,
        data: {
          '2020-04-01': {
            PLN: {
              USD: 4.12,
              EUR: 4.56,
              PLN: 1.0,
            }
          }
        },
        error: 'Rates error',
      },
      date: '',
      fromDate: '',
      toDate: '',
    },
    converter: {
      base: 'PLN',
      amount: 0,
      currencies: [],
      defaultBase: 'EUR',
    }
  };

  test('should get currency state', () => {
    // when
    const state = selectCurrencyState(globalState);

    // then
    expect(state).toEqual(globalState.currency);
  });

  describe('currencies', () => {
    test('should get currencies data', () => {
      // when
      const loading = selectCurrenciesData(globalState);

      // then
      expect(loading).toEqual(globalState.currency.currencies);
    });

    test('should get loading flag', () => {
      // when
      const loading = selectCurrencyLoading(globalState);

      // then
      expect(loading).toEqual(globalState.currency.currencies.loading);
    });

    test('should get data', () => {
      // when
      const menuItems = selectAllCurrencies(globalState);

      // then
      expect(menuItems).toEqual(globalState.currency.currencies.data);
    });

    test('should get error', () => {
      // when
      const error = selectCurrencyError(globalState);

      // then
      expect(error).toEqual(globalState.currency.currencies.error);
    });
  });

  describe('rates', () => {
    test('should get rates data', () => {
      // when
      const loading = selectRatesData(globalState);

      // then
      expect(loading).toEqual(globalState.currency.rates);
    });

    test('should get loading flag', () => {
      // when
      const loading = selectRatesLoading(globalState);

      // then
      expect(loading).toEqual(globalState.currency.rates.loading);
    });

    test('should get data', () => {
      // when
      const menuItems = selectAllRates(globalState);

      // then
      expect(menuItems).toEqual(globalState.currency.rates.data);
    });

    test('should get error', () => {
      // when
      const error = selectRatesError(globalState);

      // then
      expect(error).toEqual(globalState.currency.rates.error);
    });
  });
});
