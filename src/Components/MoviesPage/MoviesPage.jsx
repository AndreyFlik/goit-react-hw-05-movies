import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import s from "./MoviesPage.module.css";

const MoviesPage = ({ url, apiKey }) => {
  const match = useRouteMatch();
  //   console.log(match);

  const [queryName, setQueryName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchFilms, setSearchFilms] = useState([]);

  console.log(searchFilms.length);

  const handleChange = (e) => {
    setQueryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryName.trim() === "") {
      alert(`Введите запрос`);
    } else {
      setSearchName(queryName);

      reset();
    }
  };
  const reset = () => {
    setQueryName("");
  };

  useEffect(() => {
    if (searchName === "") {
      return;
    }
    const fetchSearchMov = async () => {
      const res = await fetch(
        `${url}search/movie?api_key=${apiKey}&language=en-US&query=${searchName}&page=1&include_adult=false`
      );
      if (res.status.ok) {
        return Promise.reject("Oops, something went wrong");
      }
      return res.json();
    };
    fetchSearchMov()
      .then((searchFilm) => {
        if (searchFilm.results.length === 0) {
          alert(`Ничего не найдено`);
        } else setSearchFilms(searchFilm.results);
      })
      .catch((error) => console.log(error.message));
  }, [apiKey, searchName, url]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={queryName}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search your Movies"
        />
        <button type="submit">ТЫК</button>
      </form>
      {searchFilms.length !== 0 && (
        <ul className={s.wrap}>
          {searchFilms.map((film) => (
            <li key={film.id} className={s.list}>
              <Link to={`${match.url}/${film.id}`} className={s.link}>
                --{film.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviesPage;