import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App';

// deprecated in react version 18
// import ReactDOM from 'react-dom/client';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <App />
// );

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <App/>
);
