import { combineReducers } from 'redux';

import { currencyReducer } from './currency.reducer';
import { converterReducer } from './converter.reducer';

export const reducer = combineReducers({
  currency: currencyReducer,
  converter: converterReducer,
});
