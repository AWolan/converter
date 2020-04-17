import * as React from 'react';
import {
  useState,
  MouseEvent as SyntheticMouseEvent,
  ChangeEvent,
} from 'react';

import { Option } from '../interfaces/common.interfaces';
import Field from './Field';

import './selector.scss';

interface Props {
  name: string;
  options: Option[];
  multiple?: boolean;
  className?: string;
  noIcon?: boolean;
  changeHandler?: Function;
}

const Selector = (props: Props) => {
  const [search, setSearch] = useState('');
  const options = props.options.filter((option: Option) => option.name.toLocaleLowerCase().includes(search));
  const getIcon = (option: Option) => {
    if (props.noIcon) {
      return null;
    } else if (props.multiple) {
      return option.selected ? 'check-square' : 'square';
    } else {
      return option.selected ? 'check-circle' : 'circle';
    }
  };
  const clickHandler = (event: SyntheticMouseEvent<HTMLElement, MouseEvent>) => {
    // @ts-ignore
    const field = event.target?.closest('.field');
    const value = field?.dataset?.value;
    
    if (value) {
      props.changeHandler(value);
    }
  };
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLocaleLowerCase());
  };

  return (
    <section className={`selector ${props.className || ''}`}
             onClick={props.changeHandler ? clickHandler : null}>
      <section className='selector__name'>{props.name}</section>
      <section className='selector__filter'>
        Filter: <input type='text' onChange={changeHandler} />
      </section>
      <section className='selector__values'>
        {options.map((option: Option) => (
          <Field key={option.value}
                 icon={getIcon(option)}
                 name={option.name}
                 search={search}
                 value={option.value} />
        ))}
      </section>
    </section>
  );
};

export default Selector;
