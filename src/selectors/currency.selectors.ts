import { createSelector } from 'reselect';

import {
  GlobalState,
  CurrencyState,
} from '../interfaces/state.interfaces';
import {
  LoadingData,
  Dynamic,
  Rates,
} from '../interfaces/common.interfaces';

export const selectCurrencyState = (state: GlobalState): CurrencyState => state.currency;

export const selectCurrenciesData = createSelector(selectCurrencyState,
  (state: CurrencyState): LoadingData<Dynamic<string>> => state.currencies);

export const selectAllCurrencies = createSelector(selectCurrenciesData,
  (data: LoadingData<Dynamic<string>>): Dynamic<string> => data.data);

export const selectCurrencyLoading = createSelector(selectCurrenciesData,
  (data: LoadingData<Dynamic<string>>): boolean => data.loading);

export const selectCurrencyError = createSelector(selectCurrenciesData,
  (data: LoadingData<Dynamic<string>>): string => data.error);

export const selectRatesData = createSelector(selectCurrencyState,
  (state: CurrencyState): LoadingData<Rates> => state.rates);

export const selectAllRates = createSelector(selectRatesData,
  (data: LoadingData<Rates>): Rates => data.data);

export const selectRatesLoading = createSelector(selectRatesData,
  (data: LoadingData<Rates>): boolean => data.loading);

export const selectRatesError = createSelector(selectRatesData,
  (data: LoadingData<Rates>): string => data.error);

export const selectDate = createSelector(selectCurrencyState,
  (state: CurrencyState): string => state.date);

export const selectFromDate = createSelector(selectCurrencyState,
  (state: CurrencyState): string => state.fromDate);

export const selectToDate = createSelector(selectCurrencyState,
  (state: CurrencyState): string => state.toDate);
