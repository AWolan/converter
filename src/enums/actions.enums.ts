export enum CurrencyActionType {
  LoadCurrencies = '[CURRENCY] Load Currencies',
  LoadCurrenciesSuccess = '[CURRENCY] Load Currencies Success',
  LoadCurrenciesFailure = '[CURRENCY] Load Currencies Failure',
  LoadRates = '[CURRENCY] Load Rates',
  LoadRatesSuccess = '[CURRENCY] Load Rates Success',
  LoadRatesFailure = '[CURRENCY] Load Rates Failure',
  ChangeFromDate = '[CONVERTER] Change From Date',
  ChangeToDate = '[CONVERTER] Change To Date',
};

export enum ConverterActionType {
  ChangeBase = '[CONVERTER] Change Base',
  ChangeAmount = '[CONVERTER] Change Amount',
  AddCurrency = '[CONVERTER] Add Currency',
  RemoveCurrency = '[CONVERTER] Remove Currency',
  ClearCurrencies = '[CONVERTER] Clear Currencies',
}
