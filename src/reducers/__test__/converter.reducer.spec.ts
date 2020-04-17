import { converterReducer } from '../converter.reducer';
import { ConverterState } from '../../interfaces/state.interfaces';
import {
  ConverterAction,
  ChangeBaseAction,
  ChangeAmountAction,
  AddCurrencyAction,
  RemoveCurrencyAction,
  ClearCurrenciesAction
} from '../../interfaces/converter.actions.interfaces';
import { ConverterActionType } from '../../enums/actions.enums';

describe('converter.reducer.ts', () => {
  test('should return initial state for undefined previous state', () => {
    // given
    const action = {
      type: 'Wrong type',
    };

    // when
    const newState = converterReducer(undefined, action as ConverterAction);

    // then
    expect(newState).toEqual({
      base: 'EUR',
      amount: 0,
      currencies: [],
      defaultBase: 'EUR',
    });
  });

  test('should return same state for not maching action', () => {
    // given
    const state: ConverterState = {
      base: 'PLN',
      amount: 0,
      currencies: [],
      defaultBase: 'EUR',
    };
    const action = {
      type: 'Wrong type',
    };

    // when
    const newState = converterReducer(state, action as ConverterAction);

    // then
    expect(newState).toEqual(state);
  });

  test('should return new state for change base action', () => {
    // given
    const state: ConverterState = {
      base: 'PLN',
      amount: 0,
      currencies: [],
      defaultBase: 'EUR',
    };
    const action: ChangeBaseAction = {
      type: ConverterActionType.ChangeBase,
      payload: 'USD',
    };

    // when
    const newState = converterReducer(state, action);

    // then
    expect(newState).toEqual({
      base: 'USD',
      amount: 0,
      currencies: [],
      defaultBase: 'EUR',
    });
  });

  test('should return new state for change amount action', () => {
    // given
    const state: ConverterState = {
      base: 'PLN',
      amount: 0,
      currencies: [],
      defaultBase: 'EUR',
    };
    const action: ChangeAmountAction = {
      type: ConverterActionType.ChangeAmount,
      payload: 101.5,
    };

    // when
    const newState = converterReducer(state, action);

    // then
    expect(newState).toEqual({
      base: 'PLN',
      amount: 101.5,
      currencies: [],
      defaultBase: 'EUR',
    });
  });

  test('should return new state for add currency action', () => {
    // given
    const state: ConverterState = {
      base: 'PLN',
      amount: 0,
      currencies: ['EUR'],
      defaultBase: 'EUR',
    };
    const action: AddCurrencyAction = {
      type: ConverterActionType.AddCurrency,
      payload: 'USD',
    };

    // when
    const newState = converterReducer(state, action);

    // then
    expect(newState).toEqual({
      base: 'PLN',
      amount: 0,
      currencies: ['EUR', 'USD'],
      defaultBase: 'EUR',
    });
  });

  test('should return new state for add currency action', () => {
    // given
    const state: ConverterState = {
      base: 'PLN',
      amount: 0,
      currencies: ['USD', 'EUR'],
      defaultBase: 'EUR',
    };
    const action: RemoveCurrencyAction = {
      type: ConverterActionType.RemoveCurrency,
      payload: 'USD',
    };

    // when
    const newState = converterReducer(state, action);

    // then
    expect(newState).toEqual({
      base: 'PLN',
      amount: 0,
      currencies: ['EUR'],
      defaultBase: 'EUR',
    });
  });

  test('should return new state for clear currencies action', () => {
    // given
    const state: ConverterState = {
      base: 'PLN',
      amount: 0,
      currencies: ['USD', 'EUR'],
      defaultBase: 'EUR',
    };
    const action: ClearCurrenciesAction = {
      type: ConverterActionType.ClearCurrencies,
    };

    // when
    const newState = converterReducer(state, action);

    // then
    expect(newState).toEqual({
      base: 'PLN',
      amount: 0,
      currencies: [],
      defaultBase: 'EUR',
    });
  });

});
