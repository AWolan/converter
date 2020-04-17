import axios, { AxiosResponse } from 'axios';

import {
  CurrencyResponse,
  RatesResponse,
} from '../interfaces/common.interfaces';

export const fetchCurrencies = () =>
  axios.get('/symbols')
    .then((response: AxiosResponse<CurrencyResponse>): CurrencyResponse => response.data);

export const fetchLatest = (base: string, currencies: string[]) =>
  axios.get(`/latest?base=${base}${currencies?.length > 0 ? `&symbols=${currencies.join(',')}` : ''}`)
    .then((response: AxiosResponse<RatesResponse>): RatesResponse => response.data);

export const fetchHistorical = (date: string, base: string, currencies: string[]) =>
  axios.get(`/${date}?base=${base}${currencies?.length > 0 ? `&symbols=${currencies.join(',')}` : ''}`)
    .then((response: AxiosResponse<RatesResponse>): RatesResponse => response.data);
