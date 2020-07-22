import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Heading from './Heading';
import Search from './Search';

ReactDOM.render(
  <React.StrictMode>
  <Heading/>
  <Search/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


