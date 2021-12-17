import s from "./HomePage.module.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

const HomePage = ({ url, apiKey }) => {
  const loc = useLocation();
  // console.log("HOME", loc);

  const [trendFilms, setTrendFilms] = useState([]);

  useEffect(() => {
    const fetchTrendMov = async () => {
      const res = await fetch(`${url}/trending/movie/week?api_key=${apiKey}`);
      if (res.status.ok) {
        return Promise.reject("Oops, something went wrong");
      }
      return res.json();
    };

    fetchTrendMov()
      .then((trendFilm) => {
        setTrendFilms(trendFilm.results);
      })
      .catch((error) => console.log(error.message));
  }, [apiKey, url]);

  return (
    <div>
      <h1 className={s.tittle}>Популярные кинофильмы</h1>
      <ul className={s.wrap}>
        {trendFilms.map((film) => (
          <li key={film.id} className={s.list}>
            <Link
              to={{
                pathname: `/movies/${film.id}`,
                state: { from: loc.pathname },
              }}
              className={s.link}
            >
              --{film.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
