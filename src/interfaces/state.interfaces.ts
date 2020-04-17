import {
  Dynamic,
  LoadingData,
  Rates,
} from './common.interfaces';

export interface CurrencyState {
  currencies: LoadingData<Dynamic<string>>;
  rates: LoadingData<Rates>;
  date: string;
  fromDate: string;
  toDate: string;
}

export interface ConverterState {
  base: string;
  amount: number;
  currencies: string[];
  defaultBase: string;
}

export interface GlobalState {
  currency: CurrencyState;
  converter: ConverterState;
}
