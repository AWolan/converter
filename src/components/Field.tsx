import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './field.scss';

interface Props {
  name: string;
  value: string;
  icon?: IconProp;
  search?: string;
  className?: string;
}

const Field = (props: Props) => {
  // const search = new RegExp(props.search, 'ig');
  // const name = props.search ? props.name.replace(search, `<strong>${props.search.toUpperCase()}</strong>`) : props.name;
  const start = props.name.toLowerCase().indexOf(props.search);
  const end = start + (props.search?.length || 0);
  const name = props.search ? [
    props.name.slice(0, start),
    '<strong>',
    props.name.slice(start, end),
    '</strong>',
    props.name.slice(end),
  ].join('') : props.name;

  return (
    <div className={`field ${props.className || ''}`}
         data-value={props.value}>
      {props.icon ? (
        <FontAwesomeIcon icon={props.icon}
                         className='field__icon' />
      ) : null}
      <span className='field__name'
            dangerouslySetInnerHTML={{
              __html: name,
            }}></span>
    </div>
  );
};

export default Field;
