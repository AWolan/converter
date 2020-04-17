import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import {
  loadCurrencies,
  loadCurrenciesSuccess,
  loadCurrenciesFailure,
  loadAllCurrencies,
  loadRates,
  loadRatesSuccess,
  loadRatesFailure,
  loadLatestRates,
  loadHistoricalRates,
  fetchLatestRates,
  fetchHistoricalRates,
} from '../currency.actions';
import { CurrencyActionType } from '../../enums/actions.enums';
import {
  Dynamic,
  RatesResponse,
  Rates,
  CurrencyResponse,
} from '../../interfaces/common.interfaces';
import { GlobalState } from '../../interfaces/state.interfaces';
import moment from 'moment';

const mockStore = configureMockStore<GlobalState>([thunk]);

describe('currency.action.ts', () => {
  const initialState: GlobalState = {
    currency: {
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
    },
    converter: {
      base: 'PLN',
      amount: 0,
      currencies: [],
      defaultBase: 'EUR',
    }
  };

  describe('load currency', () => {
    test('should create action for load data', () => {
      // when
      const action = loadCurrencies();

      // then
      expect(action.type).toEqual(CurrencyActionType.LoadCurrencies);
      expect(action).not.toHaveProperty('payload');
    });
    
    test('should create action for load data success', () => {
      // given
      const data: Dynamic<string> = {
        USD: 'US Dollar',
        EUR: 'Euro',
        PLN: 'Polish Zloty',
      };

      // when
      const action = loadCurrenciesSuccess(data);

      // then
      expect(action.type).toEqual(CurrencyActionType.LoadCurrenciesSuccess);
      expect(action).toHaveProperty('payload');
      expect(action.payload).toEqual(data);
    });

    test('should create action for load data failure', () => {
      // given
      const error: string = 'Some error';

      // when
      const action = loadCurrenciesFailure(error);

      // then
      expect(action.type).toEqual(CurrencyActionType.LoadCurrenciesFailure);
      expect(action).toHaveProperty('payload');
      expect(action.payload).toEqual(error);
    });

    test('should perform currencies load successfuly', async () => {
      // given
      const symbols = {
        USD: 'US Dollar',
        EUR: 'Euro',
        PLN: 'Polish Zloty',
      };
      const data: CurrencyResponse = {
        success: true,
        symbols,
      };
      // @ts-ignore
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({
        data,
      }));
      const store = mockStore(initialState);

      // when
      // @ts-ignore
      await store.dispatch(loadAllCurrencies());

      // then
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: CurrencyActionType.LoadCurrencies,
        },
        {
          type: CurrencyActionType.LoadCurrenciesSuccess,
          payload: symbols,
        },
      ]);
    });

    test('should perform currencies failed to load', async () => {
      // given
      const error = 'There is some error';
      // @ts-ignore
      mockAxios.get.mockImplementationOnce(() => Promise.reject(error));
      const store = mockStore(initialState);

      // when
      // @ts-ignore
      await store.dispatch(loadAllCurrencies());

      // then
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: CurrencyActionType.LoadCurrencies,
        },
        {
          type: CurrencyActionType.LoadCurrenciesFailure,
          payload: error,
        },
      ]);
    });
  });
  
  describe('load rates', () => {
    test('should create action for load data', () => {
      // when
      const action = loadRates();

      // then
      expect(action.type).toEqual(CurrencyActionType.LoadRates);
      expect(action).not.toHaveProperty('payload');
    });
    
    test('should create action for load data success', () => {
      // given
      const currency = 'PLN';
      const data: Rates = {
        [moment().format('YYYY-MM-DD')]: {
          [currency]: {
            'USD': 2.5,
            'EUR': 2.8,
            'PLN': 1.0,
          },
        },
      };

      // when
      const action = loadRatesSuccess(data);

      // then
      expect(action.type).toEqual(CurrencyActionType.LoadRatesSuccess);
      expect(action).toHaveProperty('payload');
      expect(action.payload).toEqual(data);
    });

    test('should create action for load data failure', () => {
      // given
      const error: string = 'Some error';

      // when
      const action = loadRatesFailure(error);

      // then
      expect(action.type).toEqual(CurrencyActionType.LoadRatesFailure);
      expect(action).toHaveProperty('payload');
      expect(action.payload).toEqual(error);
    });

    test('should perform latest rates load successfuly', async () => {
      // given
      const currency = 'PLN';
      const date = moment().format('YYYY-MM-DD');
      const rates = {
        'USD': 2.5,
        'EUR': 2.8,
        'PLN': 1.0,
      };
      const data: RatesResponse = {
        success: true,
        timestamp: moment().valueOf(),
        base: currency,
        date,
        rates,
      };
      // @ts-ignore
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({
        data,
      }));
      const store = mockStore(initialState);

      // when
      // @ts-ignore
      await store.dispatch(fetchLatestRates(currency, null));

      // then
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: CurrencyActionType.LoadRates,
        },
        {
          type: CurrencyActionType.LoadRatesSuccess,
          payload: {
            [date]: {
              [currency]: rates,
            }
          },
        },
      ]);
    });

    test('should perform latest rates failed to load', async () => {
      // given
      const currency = 'PLN';
      const error = 'There is some error';
      // @ts-ignore
      mockAxios.get.mockImplementationOnce(() => Promise.reject(error));
      const store = mockStore(initialState);

      // when
      // @ts-ignore
      await store.dispatch(fetchLatestRates(currency, null));

      // then
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: CurrencyActionType.LoadRates,
        },
        {
          type: CurrencyActionType.LoadRatesFailure,
          payload: error,
        },
      ]);
    });

    test('should perform historical rates load successfuly', async () => {
      // given
      const currency = 'PLN';
      const date = '2020-04-16';
      const rates = {
        'USD': 2.5,
        'EUR': 2.8,
        'PLN': 1.0,
      };
      const data: RatesResponse = {
        success: true,
        timestamp: moment().valueOf(),
        base: currency,
        date,
        rates,
      };
      // @ts-ignore
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({
        data,
      }));
      const store = mockStore(initialState);

      // when
      // @ts-ignore
      await store.dispatch(fetchHistoricalRates(date, currency, null));

      // then
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: CurrencyActionType.LoadRates,
        },
        {
          type: CurrencyActionType.LoadRatesSuccess,
          payload: {
            [date]: {
              [currency]: rates,
            }
          },
        },
      ]);
    });

    test('should perform historical rates failed to load', async () => {
      // given
      const currency = 'PLN';
      const date = '2020-04-16';
      const error = 'There is some error';
      // @ts-ignore
      mockAxios.get.mockImplementationOnce(() => Promise.reject(error));
      const store = mockStore(initialState);

      // when
      // @ts-ignore
      await store.dispatch(fetchHistoricalRates(date, currency, null));

      // then
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: CurrencyActionType.LoadRates,
        },
        {
          type: CurrencyActionType.LoadRatesFailure,
          payload: error,
        },
      ]);
    });
  });

});
