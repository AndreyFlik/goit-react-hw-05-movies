import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./MoviesPage.module.css";

const MoviesPage = ({ url, apiKey }) => {
  const [queryName, setQueryName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchFilm, setSearchFilm] = useState([]);

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

  const fetchSearchMov = async () => {
    const res = await fetch(
      `${url}search/movie?api_key=${apiKey}&language=en-US&query=${searchName}&page=1&include_adult=false`
    );
    if (res.status.ok) {
      return Promise.reject("Oops, something went wrong");
    }
    return res.json();
  };

  useEffect(() => {
    if (searchName === "") {
      return;
    }
    fetchSearchMov()
      .then((searchFilm) => setSearchFilm(searchFilm.results))
      .catch((error) => console.log(error.message));
  }, [searchName]);

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
      {searchFilm.length !== 0 && (
        <ul className={s.wrap}>
          {searchFilm.map((film) => (
            <li key={film.id} className={s.list}>
              <Link className={s.link}>--{film.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MoviesPage;
