import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import s from "./App.module.css";
import HomePage from "../HomePage/HomePage";
import MoviesPage from "../MoviesPage/MoviesPage";
import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage";

const URL = "https://api.themoviedb.org/3/";
const API_KEY = "152bf83924057aa5fa2efb38cb6db510";

function App() {
  return (
    <>
      <nav className={s.Nav}>
        <NavLink to="/" exact className={s.link} activeClassName={s.activeLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
          Movies
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          <HomePage url={URL} apiKey={API_KEY} />
        </Route>
        <Route exact path="/movies">
          <MoviesPage url={URL} apiKey={API_KEY} />
        </Route>
        <Route exact path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
