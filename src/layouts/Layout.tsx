import * as React from 'react';
import {
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';

import HomePage from '../pages/HomePage';
import HistoricalPage from '../pages/HistoricalPage';

import './layout.scss';

const Layout = () => {
  return (
    <>
      <header>
        <NavLink to='/latest'
                 strict
                 className='link'
                 activeClassName='active'>
          Latest
        </NavLink>
        <NavLink to='/history'
                 className='link'
                 activeClassName='active'>
          Historical
        </NavLink>
      </header>
      <Switch>
        <Route path='/history'
               component={HistoricalPage} />
        <Route path='/latest'
               component={HomePage} />
        <Redirect to='/latest' />
      </Switch>
      <footer></footer>
    </>
  );
};

export default Layout;
