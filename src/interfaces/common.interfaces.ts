export interface Dynamic<T> {
  [key: string]: T;
}

export interface DynamicObject<T> {
	[key: string]: T | DynamicObject<T>;
}

export interface LoadingData<T> {
  loading: boolean;
  data: T;
  error: string;
}

export interface Rates {
  [date: string]: {
    [currency: string]: Dynamic<number>;
  }
}

export interface CurrencyResponse {
  success: boolean;
  symbols: Dynamic<string>;
}

export interface ErrorResponse {
  code: number;
  type: string;
}

export interface RatesResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Dynamic<number>;
  error?: ErrorResponse;
}

export interface Option {
  value: string;
  name: string;
  selected: boolean;
  error?: ErrorResponse;
}

export interface Diff {
  from: number;
  to: number;
  diff: number;
}
