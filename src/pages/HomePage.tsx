import * as React from 'react';
import {
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { loadAllCurrencies, loadLatestRates } from '../actions/currency.actions';
import { selectAllCurrencies } from '../selectors/currency.selectors';
import {
  selectCurrenciesWithSelection,
  selectCurrenciesWithBase,
  selectAmount,
  selectConvertedAmounts,
  selectBase,
} from '../selectors/converter.selectors';
import Selector from '../components/Selector';
import {
  changeCurrency,
  changeBase,
  changeAmount,
} from '../actions/converter.actions';
import Input from '../components/Input';

import './homePage.scss';
import { InputType } from '../enums/common.enums';

const HomePage = () => {
  const dispatch = useDispatch();
  const base = useSelector(selectBase);
  const allCurrencies = useSelector(selectAllCurrencies);
  const currencies = useSelector(selectCurrenciesWithSelection);
  const baseCurrencies = useSelector(selectCurrenciesWithBase);
  const amount = useSelector(selectAmount);
  const convertedAmounts = useSelector(selectConvertedAmounts);
  const baseChangeHandler = (value: string) => {
    dispatch(changeBase(value));
  };
  const currencyChangeHandler = (value: string) => {
    dispatch(changeCurrency(value));
  };
  const amountChangeHandler = (value: number) => {
    dispatch(changeAmount(value));
  };
  const convertClickHandler = () => {
    dispatch(loadLatestRates());
  };

  useEffect(() => {
    dispatch(loadAllCurrencies());
  }, []);

  return (
    <article className='home'>
      <section className='info'>
        {`We can convert ${Object.keys(allCurrencies).length} currencies`}
      </section>
      <Input className='base-amount'
              name={`From amount [${base}]`}
              value={amount}
              type={InputType.number}
              changeHanlder={amountChangeHandler} />
      <Selector key='base'
                name='From'
                className='base'
                options={baseCurrencies}
                changeHandler={baseChangeHandler} />
      <button className='exchange'
              onClick={convertClickHandler}>Convert</button>
      <Selector key='amounts'
                name='To Amount(s)'
                className='currencies-amounts'
                noIcon
                options={convertedAmounts} />
      <Selector key='currencies'
                name='To'
                className='currencies'
                options={currencies}
                multiple
                changeHandler={currencyChangeHandler} />
    </article>
  );
};

export default HomePage;
