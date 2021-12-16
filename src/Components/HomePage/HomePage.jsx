import React from "react";
import s from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = ({ trendFilmList }) => {
  return (
    <div>
      <h1 className={s.tittle}>Популярные кинофильмы</h1>
      <ul className={s.wrap}>
        {trendFilmList.map((film) => (
          <li key={film.id} className={s.list}>
            <Link className={s.link}>--{film.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
