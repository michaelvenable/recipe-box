import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import RecipeIndexPage from './pages/RecipeIndexPage';
import ViewRecipePage from './pages/ViewRecipePage';
import Menu from './menu';

import './css/bootstrap.min.css';
import './css/styles.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

export default class App extends React.Component {
  async componentDidMount() {
    self.navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/serviceworker.js`)
      .then(() => console.log('Service worker was registered.'))
      .catch(error => console.log('Service worker was not registered.', error));

    self.navigator.serviceWorker.ready.then(
      registration => {
        // Firefox doesn't support SyncManager yet :(
        if (registration.sync !== undefined) {
          registration.sync.register('fetch-recipes');
        } else {
          console.log('The user agent does not support the SyncManager API, so background syncing of data is not available.');
        }
      }
    );
  }

  render() {
    return (
      <Router>
        <Menu />

        <div className="App">
        </div>

        <Switch>
          <Route exact path="/" component={RecipeIndexPage} />
          <Route exact path="/recipes" component={RecipeIndexPage} />
          <Route path="/recipes/:title" component={ViewRecipePage} />
        </Switch>
      </Router>
    );
  }
}