import React from 'react';
import ReactDOM from 'react-dom';
import 'react-quill/dist/quill.snow.css';
import 'antd/dist/antd.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRoutes from "./AppRoutes";
import DefaultProvider from "./shared/provider/DefaultProvider";

ReactDOM.render(
  <React.StrictMode>
    <DefaultProvider>
      <AppRoutes />
    </DefaultProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
