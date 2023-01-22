import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './Header';
import RecipeIndexPage from './pages/RecipeIndexPage';
import RecipeStore from './RecipeStore';
import RecipeViewPage from './pages/RecipeViewPage';
import MealPlan from './MealPlan';

import './css/bootstrap.min.css';
import './css/styles.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

export default class App extends React.Component {
  async componentDidMount() {
    const recipes = new RecipeStore();
    await recipes.syncWithServer();
  }

  render() {
    return (
      <Router>
        <Header />

        <div className="App">
        </div>

        <Routes>
          <Route path="/" element={<RecipeIndexPage />} />
          <Route path="/recipes" element={<RecipeIndexPage />} />
          <Route path="/plan" element={<MealPlan />} />
          <Route path="/recipes/:title" element={<RecipeViewPage />} />
        </Routes>
      </Router>
    );
  }
}