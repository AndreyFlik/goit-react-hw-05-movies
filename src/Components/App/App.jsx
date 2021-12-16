import React from "react";
import { NavLink } from "react-router-dom";
import s from "./App.module.css";
import HomePage from "../HomePage/HomePage";
import MoviesPage from "../MoviesPage/MoviesPage";

const URL = "https://api.themoviedb.org/3/";
const API_KEY = "152bf83924057aa5fa2efb38cb6db510";

function App() {
  return (
    <>
      <nav className={s.Nav}>
        <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
          Movies
        </NavLink>
      </nav>
      <HomePage url={URL} apiKey={API_KEY} />
      <MoviesPage url={URL} apiKey={API_KEY} />
    </>
  );
}

export default App;
