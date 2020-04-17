import { ConverterActionType } from '../enums/actions.enums';

export interface ChangeBaseAction {
  type: ConverterActionType.ChangeBase;
  payload: string;
}

export interface ChangeAmountAction {
  type: ConverterActionType.ChangeAmount;
  payload: number;
}

export interface AddCurrencyAction {
  type: ConverterActionType.AddCurrency;
  payload: string;
}

export interface RemoveCurrencyAction {
  type: ConverterActionType.RemoveCurrency;
  payload: string;
}

export interface ClearCurrenciesAction {
  type: ConverterActionType.ClearCurrencies;
}



export type ConverterAction = ChangeBaseAction
  | ChangeAmountAction
  | AddCurrencyAction
  | RemoveCurrencyAction
  | ClearCurrenciesAction;