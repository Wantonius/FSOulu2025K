import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import hotelReducer from './reducers/hotelReducer';
import type {AppState,Action} from './reducers/hotelReducer';
import type {Store} from 'redux';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './App.tsx'

const store:Store<AppState,Action> = createStore(hotelReducer)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  </StrictMode>,
)
