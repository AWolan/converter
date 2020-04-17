import { ConverterState } from '../interfaces/state.interfaces';
import { ConverterAction } from '../interfaces/converter.actions.interfaces';
import { ConverterActionType } from '../enums/actions.enums';

const initialState: ConverterState = {
  base: 'EUR',
  amount: 0,
  currencies: [],
  defaultBase: 'EUR',
};

export const converterReducer = (state: ConverterState = initialState, action: ConverterAction) => {
  switch (action.type) {
    case ConverterActionType.ChangeBase: {
      return {
        ...state,
        base: action.payload,
      };
    }
    case ConverterActionType.ChangeAmount: {
      return {
        ...state,
        amount: action.payload,
      };
    }
    case ConverterActionType.AddCurrency: {
      return {
        ...state,
        currencies: [...state.currencies, action.payload],
      };
    }
    case ConverterActionType.RemoveCurrency: {
      return {
        ...state,
        currencies: state.currencies.filter((currency: string) => currency !== action.payload),
      };
    }
    case ConverterActionType.ClearCurrencies: {
      return {
        ...state,
        currencies: [],
      };
    }
    
    default: {
      return state;
    }
  }
};
