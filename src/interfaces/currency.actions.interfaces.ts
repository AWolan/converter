import { CurrencyActionType } from '../enums/actions.enums';
import {
  Dynamic,
  Rates,
} from './common.interfaces';

export interface LoadCurrenciesAction {
  type: CurrencyActionType.LoadCurrencies;
}

export interface LoadCurrenciesSuccessAction {
  type: CurrencyActionType.LoadCurrenciesSuccess;
  payload: Dynamic<string>;
}

export interface LoadCurrenciesFailureAction {
  type: CurrencyActionType.LoadCurrenciesFailure;
  payload: string;
}

export interface LoadRatesAction {
  type: CurrencyActionType.LoadRates;
}

export interface LoadRatesSuccessAction {
  type: CurrencyActionType.LoadRatesSuccess;
  payload: Rates;
}

export interface LoadRatesFailureAction {
  type: CurrencyActionType.LoadRatesFailure;
  payload: string;
}

export interface ChangeFromDateAction {
  type: CurrencyActionType.ChangeFromDate;
  payload: string;
}

export interface ChangeToDateAction {
  type: CurrencyActionType.ChangeToDate;
  payload: string;
}

export type CurrencyAction = LoadCurrenciesAction
  | LoadCurrenciesSuccessAction
  | LoadCurrenciesFailureAction
  | LoadRatesAction
  | LoadRatesSuccessAction
  | LoadRatesFailureAction
  | ChangeFromDateAction
  | ChangeToDateAction;