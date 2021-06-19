import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import RecipeIndexPage from './pages/index';
import ViewRecipePage from './pages/view';
import Menu from './menu';

import './css/bootstrap.min.css';
import './css/styles.css';
import 'font-awesome/css/font-awesome.min.css';

export default function App() {
  return (
    <Router>
      <Menu />

      <div className="App">
      </div>

      <Switch>
        <Route exact path="/" component={RecipeIndexPage} />
        <Route exact path="/recipes" component={RecipeIndexPage} />
        <Route exact path="/recipes/:title" component={ViewRecipePage} />
      </Switch>
    </Router>
  );
}