import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router";
import {Provider} from "react-redux";
import stores from "./redux/store.js";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={stores}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </Provider>
  </StrictMode>
)
