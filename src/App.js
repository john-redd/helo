import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import store from './redux/store';
import routes from './utils/routes';
import Nav from './components/Nav';
import './Reset.css';
import styled from 'styled-components';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppMC>
          {/* <Nav /> */}
          {routes}
        </AppMC>
      </HashRouter>
    </Provider>
  );
}

export default App;

const AppMC = styled.section`
  font-family: 'Open Sans', sans-serif;
`