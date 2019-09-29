import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './LandingPage';

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";

import * as serviceWorker from './serviceWorker';
/**
 * Descomentar para voltar ao status inicial do projeto
 * 
 * import App from './App';
 * ReactDOM.render(<App />, document.getElementById('root'));
 */

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/"
        render={props => <LandingPage {...props} />}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
