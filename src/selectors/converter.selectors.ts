import { createSelector } from 'reselect';

import {
  GlobalState,
  ConverterState,
} from '../interfaces/state.interfaces';
import {
  selectAllCurrencies,
  selectAllRates,
  selectDate,
  selectFromDate,
  selectToDate,
} from './currency.selectors';
import { Dynamic, Option, Rates, Diff } from '../interfaces/common.interfaces';

export const selectConverterState = (state: GlobalState): ConverterState => state.converter;

export const selectBase = createSelector(selectConverterState, (state: ConverterState): string => state.base);

export const selectAmount = createSelector(selectConverterState, (state: ConverterState): number => state.amount);

export const selectCurrencies = createSelector(selectConverterState, (state: ConverterState): string[] => state.currencies);

export const selectDefaultBase = createSelector(selectConverterState, (state: ConverterState): string => state.defaultBase);

export const selectCurrenciesWithBase = createSelector([selectAllCurrencies, selectBase],
  (currencies: Dynamic<string>, base: string): Option[] => Object.keys(currencies).map((key: string) => ({
    value: key,
    name: `${key} (${currencies[key]})`,
    selected: key === base,
  })));

export const selectCurrenciesWithSelection = createSelector([selectAllCurrencies, selectCurrencies],
  (currencies: Dynamic<string>, selected: string[]): Option[] => Object.keys(currencies).map((key: string) => ({
    value: key,
    name: `${key} (${currencies[key]})`,
    selected: selected.includes(key),
  })));

export const selectSelectedCurrencies = createSelector([selectAllCurrencies, selectCurrencies],
  (currencies: Dynamic<string>, selected: string[]): string[] => selected?.length > 0 ? Object.keys(currencies)
    .filter((key: string) => selected.includes(key)) : Object.keys(currencies));

export const selectConversionRates = createSelector([selectBase, selectDefaultBase, selectSelectedCurrencies, selectAllRates, selectDate],
  (base: string, defaultBase: string, currencies: string[], allRates: Rates, date: string): Dynamic<number> => {
    const dateRates = allRates[date];
    if (!dateRates) {
      return {};
    }
    // const availableCurrencies = Object.keys(dateRates);
    const isBaseAsBase = Object.keys(dateRates).includes(base);
    const baseRate = isBaseAsBase ? 1 : dateRates[defaultBase]?.[base];
    if (!baseRate) {
      return {};
    }
    const rates = isBaseAsBase ? dateRates[base] : dateRates[defaultBase];
    return currencies.reduce((result: Dynamic<number>, currency: string) => ({
      ...result,
      [currency]: rates[currency] / baseRate,
    }), {});
  });

export const selectConvertedAmounts = createSelector([selectConversionRates, selectAmount],
  (rates: Dynamic<number>, amount: number): Option[] => Object.keys(rates)
    .map((currency: string) => ({
      value: currency,
      name: `${currency}: ${(rates[currency] * amount).toFixed(2)}`,
      selected: true,
    }), {}));

export const selectHistoricalConversionRates = createSelector([selectBase, selectDefaultBase, selectSelectedCurrencies, selectAllRates, selectFromDate, selectToDate],
  (base: string, defaultBase: string, currencies: string[], allRates: Rates, fromDate: string, toDate: string): Dynamic<Diff> => {
    const fromDateRates = allRates[fromDate];
    const toDateRates = allRates[toDate];
    if (!fromDateRates || !toDateRates) {
      return {};
    }
    // const availableCurrencies = Object.keys(dateRates);
    const isFromBaseAsBase = Object.keys(fromDateRates).includes(base);
    const isToBaseAsBase = Object.keys(toDateRates).includes(base);
    const fromBaseRate = isFromBaseAsBase ? 1 : fromDateRates[defaultBase]?.[base];
    const toBaseRate = isToBaseAsBase ? 1 : toDateRates[defaultBase]?.[base];
    if (!fromBaseRate || !toBaseRate) {
      return {};
    }
    const fromRates = isFromBaseAsBase ? fromDateRates[base] : fromDateRates[defaultBase];
    const toRates = isToBaseAsBase ? toDateRates[base] : toDateRates[defaultBase];
    return currencies.reduce((result: Dynamic<Diff>, currency: string) => {
      const from = fromRates[currency] / fromBaseRate;
      const to = toRates[currency] / toBaseRate;

      return {
        ...result,
        [currency]: {
          from,
          to,
          diff: to - from,
        },
      };
    }, {});
  });

export const selectConvertedHistoricalAmounts = createSelector([selectHistoricalConversionRates, selectAmount],
  (rates: Dynamic<Diff>, amount: number): Option[] => Object.keys(rates)
    .map((currency: string) => ({
      value: currency,
      name: `[${currency}] from: ${(rates[currency].from * amount).toFixed(2)} to: ${(rates[currency].to * amount).toFixed(2)} diff: ${(rates[currency].diff * amount).toFixed(2)}`,
      selected: true,
    }), {}));
