import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import {store} from "./store.js"
import { Provider } from 'react-redux';
import { CartProvider } from "react-use-cart";
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
      {/* <React.StrictMode> */}
    <BrowserRouter>
    <CartProvider>
    <App />
    </CartProvider>
    </BrowserRouter>
  {/* </React.StrictMode>, */}
    </Provider>
)
