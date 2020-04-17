import { CurrencyState } from '../interfaces/state.interfaces';
import { CurrencyAction } from '../interfaces/currency.actions.interfaces';
import { CurrencyActionType } from '../enums/actions.enums';
import moment from 'moment';

const initialState: CurrencyState = {
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
};

export const currencyReducer = (state: CurrencyState = initialState, action: CurrencyAction) => {
  switch (action.type) {
    case CurrencyActionType.LoadCurrencies: {
      return {
        ...state,
        currencies: {
          ...state.currencies,
          loading: true,
        },
      };
    }
    case CurrencyActionType.LoadCurrenciesSuccess: {
      return {
        ...state,
        currencies: {
          ...state.currencies,
          data: action.payload,
          loading: false,
        },
      };
    }
    case CurrencyActionType.LoadCurrenciesFailure: {
      return {
        ...state,
        currencies: {
          ...state.currencies,
          error: action.payload,
          loading: false,
        },
      };
    }
    case CurrencyActionType.LoadRates: {
      return {
        ...state,
        rates: {
          ...state.rates,
          loading: true,
        },
      };
    }
    case CurrencyActionType.LoadRatesSuccess: {
      return {
        ...state,
        rates: {
          ...state.rates,
          data: {
            ...state.rates.data,
            ...action.payload,
          },
          loading: false,
        },
      };
    }
    case CurrencyActionType.LoadRatesFailure: {
      return {
        ...state,
        rates: {
          ...state.rates,
          error: action.payload,
          loading: false,
        },
      };
    }
    case CurrencyActionType.ChangeFromDate: {
      const fromDate = state.toDate && moment(state.toDate).isBefore(action.payload) ? state.toDate : action.payload;
      return {
        ...state,
        fromDate,
      };
    }
    case CurrencyActionType.ChangeToDate: {
      const toDate = state.fromDate && moment(state.fromDate).isAfter(action.payload) ? state.fromDate : action.payload;
      return {
        ...state,
        toDate,
      };
    }
    default: {
      return state;
    }
  }
};
