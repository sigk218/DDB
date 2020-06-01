import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import App from './App';
import './index.css';
import reducers from './reducers';
import { uploadReciept } from './actions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

console.log(store.getState())

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(uploadReciept('buffer', 'base64'))

unsubscribe()

ReactDOM.render(

  <Provider store={store}>
    <React.StrictMode>
    <App />
    </React.StrictMode>
      
    
  </Provider>,
  document.querySelector("#root")
);

