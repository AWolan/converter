import {
  LoadCurrenciesAction,
  LoadCurrenciesSuccessAction,
  LoadCurrenciesFailureAction,
  LoadRatesAction,
  LoadRatesSuccessAction,
  LoadRatesFailureAction,
  ChangeFromDateAction,
  ChangeToDateAction,
} from '../interfaces/currency.actions.interfaces';
import { CurrencyActionType } from '../enums/actions.enums';
import {
  fetchCurrencies,
  fetchLatest,
  fetchHistorical,
} from '../services/currency.service';
import {
  Dynamic,
  Rates,
  CurrencyResponse,
  RatesResponse,
} from '../interfaces/common.interfaces';
import moment, { Moment } from 'moment';
import { selectBase, selectCurrencies, selectDefaultBase } from '../selectors/converter.selectors';
import { selectAllRates, selectFromDate, selectToDate } from '../selectors/currency.selectors';
import { GlobalState } from '../interfaces/state.interfaces';

export const loadCurrencies = (): LoadCurrenciesAction => ({
  type: CurrencyActionType.LoadCurrencies,
});

export const loadCurrenciesSuccess = (data: Dynamic<string>): LoadCurrenciesSuccessAction => ({
  type: CurrencyActionType.LoadCurrenciesSuccess,
  payload: data,
});

export const loadCurrenciesFailure = (error: string): LoadCurrenciesFailureAction => ({
  type: CurrencyActionType.LoadCurrenciesFailure,
  payload: error,
});

export const loadAllCurrencies = (): Function => (dispatch: Function): Promise<void> => {
  dispatch(loadCurrencies());

  return fetchCurrencies()
    .then((response: CurrencyResponse): void => {
      dispatch(loadCurrenciesSuccess(response.symbols));
    })
    .catch((error: any) => {
      dispatch(loadCurrenciesFailure(error?.toString()))
    });
};

export const loadRates = (): LoadRatesAction => ({
  type: CurrencyActionType.LoadRates,
});

export const loadRatesSuccess = (data: Rates): LoadRatesSuccessAction => ({
  type: CurrencyActionType.LoadRatesSuccess,
  payload: data,
});

export const loadRatesFailure = (error: string): LoadRatesFailureAction => ({
  type: CurrencyActionType.LoadRatesFailure,
  payload: error,
});

const convertToRates = (response: RatesResponse): Rates => ({
  [response.date]: {
    [response.base]: response.rates,
  },
});

const getCurrencies = (state: GlobalState, date: string): string[] => {
  const allRates = selectAllRates(state);
  const base = selectBase(state);
  const defaultBase = selectDefaultBase(state);
  const currencies = selectCurrencies(state);
  const symbols = currencies?.length > 0 ? [base, ...currencies] : [];

  const dateRates = allRates[date];
  if (dateRates) {
    const isBaseAsBase = Object.keys(dateRates).includes(base);
    const rates = isBaseAsBase ? dateRates[base] : dateRates[defaultBase];
    if (rates) {
      const ratesCurrencies = Object.keys(rates);
      if (symbols.every((symbol: string) => ratesCurrencies.includes(symbol))) {
        return [];
      }
    }
  }
  return [base, defaultBase, ...symbols];
}

export const loadLatestRates = (): Function => (dispatch: Function, getState: Function) => {
  const date = moment().format('YYYY-MM-DD');
  const state = getState();
  
  const [base, defaultBase, ...symbols] = getCurrencies(state, date);

  if (base && defaultBase) {
    dispatch(fetchLatestRates(base, defaultBase, symbols));
  }
};

export const fetchLatestRates = (base: string, defaultBase: string, symbols?: string[]): Function => (dispatch: Function): Promise<void> => {
  dispatch(loadRates());

  return fetchLatest(base, symbols)
    .then((response: RatesResponse): void => {
      if (response.success) {
        dispatch(loadRatesSuccess(convertToRates(response)));
      } else {
        dispatch(loadRatesFailure(`[${response.error?.code || 'ERROR'}] ${response.error?.type || ''}`));
        if (response.error?.code === 105 && defaultBase) {
          dispatch(fetchLatestRates(defaultBase, null, symbols));
        }
      }
    })
    .catch((error: any) => {
      dispatch(loadRatesFailure(error?.toString()))
    });
};

export const loadHistoricalRates = (): Function => (dispatch: Function, getState: Function) => {
  const state = getState();
  const fromDate = selectFromDate(state);
  const toDate = selectToDate(state);
  const [fromBase, fromDefaultBase, ...fromSymbols] = getCurrencies(state, fromDate);
  const [toBase, toDefaultBase, ...toSymbols] = getCurrencies(state, toDate);

  if (fromBase && fromDefaultBase) {
    dispatch(fetchHistoricalRates(fromDate, fromBase, fromDefaultBase, fromSymbols));
  }
  if (toBase && toDefaultBase) {
    dispatch(fetchHistoricalRates(toDate, toBase, toDefaultBase, toSymbols));
  }
};

export const fetchHistoricalRates = (date: string, base: string, defaultBase: string,  symbols?: string[]): Function => (dispatch: Function): Promise<void> => {
  dispatch(loadRates());

  return fetchHistorical(date, base, symbols)
    .then((response: RatesResponse): void => {
      if (response.success) {
        dispatch(loadRatesSuccess(convertToRates(response)));
      } else {
        dispatch(loadRatesFailure(`[${response.error?.code || 'ERROR'}] ${response.error?.type || ''}`));
        if (response.error?.code === 105 && defaultBase) {
          dispatch(fetchHistoricalRates(date, defaultBase, null, symbols));
        }
      }
    })
    .catch((error: any) => {
      dispatch(loadRatesFailure(error?.toString()))
    });
};

export const changeFromDate = (value: string): ChangeFromDateAction => ({
  type: CurrencyActionType.ChangeFromDate,
  payload: value,
});

export const changeToDate = (value: string): ChangeToDateAction => ({
  type: CurrencyActionType.ChangeToDate,
  payload: value,
});
