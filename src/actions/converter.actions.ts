import { ChangeBaseAction, ChangeAmountAction, AddCurrencyAction, RemoveCurrencyAction, ClearCurrenciesAction } from '../interfaces/converter.actions.interfaces';
import { ConverterActionType } from '../enums/actions.enums';
import { selectCurrencies } from '../selectors/converter.selectors';

export const changeBase = (value: string): ChangeBaseAction => ({
  type: ConverterActionType.ChangeBase,
  payload: value,
});

export const changeAmount = (value: number): ChangeAmountAction => ({
  type: ConverterActionType.ChangeAmount,
  payload: value,
});

export const addCurrency = (value: string): AddCurrencyAction => ({
  type: ConverterActionType.AddCurrency,
  payload: value,
});

export const removeCurrency = (value: string): RemoveCurrencyAction => ({
  type: ConverterActionType.RemoveCurrency,
  payload: value,
});

export const clearCurrencies = (): ClearCurrenciesAction => ({
  type: ConverterActionType.ClearCurrencies,
});

export const changeCurrency = (value: string): Function => (dispatch: Function, getState: Function) => {
  const selected = selectCurrencies(getState());
  if (selected.includes(value)) {
    dispatch(removeCurrency(value));
  } else {
    dispatch(addCurrency(value));
  }
};
