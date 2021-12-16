import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import s from "./App.module.css";
import HomePage from "../HomePage/HomePage";

const URL = "https://api.themoviedb.org/3/";
const API_KEY = "152bf83924057aa5fa2efb38cb6db510";
// ${API_KEY}

function App() {
  const [trendFilm, setTrendFilm] = useState([]);

  const fetchMov = async () => {
    const res = await fetch(`${URL}/trending/movie/week?api_key=${API_KEY}`);
    if (res.status.ok) {
      return Promise.reject("Oops, something went wrong");
    }
    return res.json();
  };

  useEffect(() => {
    fetchMov()
      .then((trendFilm) => setTrendFilm(trendFilm.results))
      .catch((error) => console.log(error.message));
  }, []);

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
      <HomePage trendFilmList={trendFilm} />
    </>
  );
}

export default App;
