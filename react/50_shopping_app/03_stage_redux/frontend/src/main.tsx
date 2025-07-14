import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom';
import shoppingReducer from './reducers/shoppingReducer';
import loginReducer from './reducers/loginReducer';
import type {Store} from 'redux';
import {combineReducers,createStore,applyMiddleware} from 'redux';
import type {AppState,RootReducer,Action} from './types/states';
import {Provider} from 'react-redux';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers<RootReducer>({
	login:loginReducer,
	shopping:shoppingReducer
})

const store:Store<AppState,Action> = createStore(rootReducer,applyMiddleware(thunk));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<BrowserRouter>
	<Provider store={store}>
		<App />
	</Provider>
	</BrowserRouter>
  </StrictMode>,
)
