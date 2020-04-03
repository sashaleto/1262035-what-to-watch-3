import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from './components/app/app.jsx';
import {reducer} from './reducer';
import {Operation as DataOperation} from "./reducer";
import {heroMovie} from "./mocks/hero-movie";
import {createAPI} from "./api.js";

const api = createAPI(() => {});

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadFilms());

ReactDOM.render(
    <Provider store={store}>
      <App heroMovie={heroMovie}/>
    </Provider>,
    document.querySelector(`#root`)
);
