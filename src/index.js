import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import storeApp from './config/reduxConfig';
import { HashRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={storeApp().store}>
    <PersistGate loading={<React.Fragment />} persistor={storeApp().persist}>
      <React.Suspense fallback={<React.Fragment />}>
        <Router>
          <App />
        </Router>
      </React.Suspense>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
