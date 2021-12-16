import s from "./HomePage.module.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const HomePage = ({ url, apiKey }) => {
  const [trendFilms, setTrendFilms] = useState([]);
  // const [movieId, setMovieId] = useState("");
  // console.log(movieId);
  const fetchTrendMov = async () => {
    const res = await fetch(`${url}/trending/movie/week?api_key=${apiKey}`);
    if (res.status.ok) {
      return Promise.reject("Oops, something went wrong");
    }
    return res.json();
  };

  useEffect(() => {
    fetchTrendMov()
      .then((trendFilm) => {
        setTrendFilms(trendFilm.results);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div>
      <h1 className={s.tittle}>Популярные кинофильмы</h1>
      <ul className={s.wrap}>
        {trendFilms.map((film) => (
          <li key={film.id} className={s.list}>
            <Link to={`/movies/${film.id}`} className={s.link}>
              --{film.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
