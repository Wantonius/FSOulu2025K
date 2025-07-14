import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import countReducer from './reducers/countReducer';
import type {Action,State} from './reducers/countReducer';
import type {Store} from 'redux';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './App.tsx'

const store:Store<State,Action> = createStore(countReducer);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </StrictMode>,
)
