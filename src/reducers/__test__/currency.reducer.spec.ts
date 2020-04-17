import { currencyReducer } from '../currency.reducer';
import { CurrencyState } from '../../interfaces/state.interfaces';
import { CurrencyAction, LoadCurrenciesAction, LoadCurrenciesSuccessAction, LoadCurrenciesFailureAction, LoadRatesAction, LoadRatesFailureAction, LoadRatesSuccessAction } from '../../interfaces/currency.actions.interfaces';
import { CurrencyActionType } from '../../enums/actions.enums';
import { Dynamic, Rates } from '../../interfaces/common.interfaces';
import moment from 'moment';

describe('currency.reducer.ts', () => {
  test('should return initial state for undefined previous state', () => {
    // given
    const action = {
      type: 'Wrong type',
    };

    // when
    const newState = currencyReducer(undefined, action as CurrencyAction);

    // then
    expect(newState).toEqual({
      currencies: {
        loading: false,
        data: {},
        error: null,
      },
      rates: {
        loading: false,
        data: {},
        error: null,
      },
      date: moment().format('YYYY-MM-DD'),
      fromDate: null,
      toDate: null,
    });
  });

  test('should return same state for not maching action', () => {
    // given
    const state: CurrencyState = {
      currencies: {
        loading: false,
        data: {},
        error: null,
      },
      rates: {
        loading: false,
        data: {},
        error: null,
      },
      date: moment().format('YYYY-MM-DD'),
      fromDate: '',
      toDate: '',
    };
    const action = {
      type: 'Wrong type',
    };

    // when
    const newState = currencyReducer(state, action as CurrencyAction);

    // then
    expect(newState).toEqual(state);
  });

  describe('load currencies', () => {
    test('should return new state for load action', () => {
      // given
      const state: CurrencyState = {
        currencies: {
          loading: false,
          data: {},
          error: null,
        },
        rates: {
          loading: false,
          data: {},
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      };
      const action: LoadCurrenciesAction = {
        type: CurrencyActionType.LoadCurrencies,
      };

      // when
      const newState = currencyReducer(state, action);

      // then
      expect(newState).toEqual({
        currencies: {
          loading: true,
          data: {},
          error: null,
        },
        rates: {
          loading: false,
          data: {},
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      });
    });

    test('should return new state for successfully load action', () => {
      // given
      const state: CurrencyState = {
        currencies: {
          loading: true,
          data: {},
          error: null,
        },
        rates: {
          loading: false,
          data: {},
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      };
      const data: Dynamic<string> = {
        USD: 'US Dollar',
        EUR: 'Euro',
        PLN: 'Polish Zloty',
      };
      const action: LoadCurrenciesSuccessAction = {
        type: CurrencyActionType.LoadCurrenciesSuccess,
        payload: data,
      };

      // when
      const newState = currencyReducer(state, action);

      // then
      expect(newState).toEqual({
        currencies: {
          loading: false,
          data,
          error: null,
        },
        rates: {
          loading: false,
          data: {},
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      });
    });

    test('should return new state for failed load action', () => {
      // given
      const state: CurrencyState = {
        currencies: {
          loading: true,
          data: {},
          error: null,
        },
        rates: {
          loading: false,
          data: {},
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      };
      const error = 'There is some error';
      const action: LoadCurrenciesFailureAction = {
        type: CurrencyActionType.LoadCurrenciesFailure,
        payload: error,
      };

      // when
      const newState = currencyReducer(state, action);

      // then
      expect(newState).toEqual({
        currencies: {
          loading: false,
          data: {},
          error,
        },
        rates: {
          loading: false,
          data: {},
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      });
    });
  });

  describe('load rates', () => {
    test('should return new state for load action', () => {
      // given
      const state: CurrencyState = {
        currencies: {
          loading: false,
          data: {},
          error: null,
        },
        rates: {
          loading: false,
          data: {},
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      };
      const action: LoadRatesAction = {
        type: CurrencyActionType.LoadRates,
      };

      // when
      const newState = currencyReducer(state, action);

      // then
      expect(newState).toEqual({
        currencies: {
          loading: false,
          data: {},
          error: null,
        },
        rates: {
          loading: true,
          data: {},
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      });
    });

    test('should return new state for successfully load action', () => {
      // given
      const state: CurrencyState = {
        currencies: {
          loading: false,
          data: {},
          error: null,
        },
        rates: {
          loading: true,
          data: {},
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      };
      const data: Rates = {
        '2020-04-01': {
          PLN: {
            USD: 4.12,
            EUR: 4.56,
            PLN: 1.0,
          }
        }
      };
      const action: LoadRatesSuccessAction = {
        type: CurrencyActionType.LoadRatesSuccess,
        payload: data,
      };

      // when
      const newState = currencyReducer(state, action);

      // then
      expect(newState).toEqual({
        currencies: {
          loading: false,
          data: {},
          error: null,
        },
        rates: {
          loading: false,
          data,
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      });
    });

    test('should return new state for failed load action', () => {
      // given
      const state: CurrencyState = {
        currencies: {
          loading: false,
          data: {},
          error: null,
        },
        rates: {
          loading: true,
          data: {},
          error: null,
        },
        date: '',
        fromDate: '',
        toDate: '',
      };
      const error = 'There is some error';
      const action: LoadRatesFailureAction = {
        type: CurrencyActionType.LoadRatesFailure,
        payload: error,
      };

      // when
      const newState = currencyReducer(state, action);

      // then
      expect(newState).toEqual({
        currencies: {
          loading: false,
          data: {},
          error: null,
        },
        rates: {
          loading: false,
          data: {},
          error,
        },
        date: '',
        fromDate: '',
        toDate: '',
      });
    });
  });
});
