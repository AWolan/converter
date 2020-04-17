import {
  selectConverterState,
  selectBase,
  selectAmount,
  selectCurrencies,
} from '../converter.selectors';
import { GlobalState } from '../../interfaces/state.interfaces';


describe('menu.selector.ts', () => {
  const globalState: GlobalState = {
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
      amount: 103.45,
      currencies: ['EUR', 'USD'],
      defaultBase: 'EUR',
    },
  };

  test('should get converter state', () => {
    // when
    const state = selectConverterState(globalState);

    // then
    expect(state).toEqual(globalState.converter);
  });

  test('should get base', () => {
    // when
    const state = selectBase(globalState);

    // then
    expect(state).toEqual(globalState.converter.base);
  });

  test('should get amount', () => {
    // when
    const state = selectAmount(globalState);

    // then
    expect(state).toEqual(globalState.converter.amount);
  });

  test('should get currencies', () => {
    // when
    const state = selectCurrencies(globalState);

    // then
    expect(state).toEqual(globalState.converter.currencies);
  });
});
