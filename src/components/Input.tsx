import * as React from 'react';

import { InputType } from '../enums/common.enums';
import moment from 'moment';

interface Props {
  name: string;
  value: number | string;
  type: InputType;
  className?: string;
  changeHanlder: Function;
}

const Input = (props: Props) => {
  const value = props.type === InputType.date ? moment(props.value).format('YYYY-MM-DD') : props.value;
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.changeHanlder(event.target.value);
  };
  return (
    <div className={`input ${props.className || ''}`}>
      <label className='input__label'>{props.name}</label>
      <input className='input__input'
             type={props.type}
             value={value}
             onChange={changeHandler} />
    </div>
  );
};

export default Input;
