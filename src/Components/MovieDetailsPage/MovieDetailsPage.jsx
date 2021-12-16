// import s from "./MovieDetailsPage/MovieDetailsPage.module.css";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [aboutFilm, setAboutFilm] = useState([]);
  //   const [ganres, setGanres] = useState([]);
  //   console.log(aboutFilm.genres);
  const feMov = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=152bf83924057aa5fa2efb38cb6db510`
    );
    if (res.status.ok) {
      return Promise.reject("Oops, something went wrong");
    }
    return res.json();
  };

  useEffect(() => {
    feMov()
      .then((Filminfo) => setAboutFilm(Filminfo))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div>
      <button type="button"></button>
      <h2>{aboutFilm.original_title}</h2>
      {aboutFilm.length !== 0 && (
        <img
          src={`https://image.tmdb.org/t/p/w300/${aboutFilm.poster_path}`}
          alt={aboutFilm.original_title}
        />
      )}
      <p>{`Рейтинг ${aboutFilm.popularity}`}</p>
      <h3>Описание</h3>
      <p>{aboutFilm.overview}</p>
      <h4>Жанры</h4>
    </div>
  );
};

export default MovieDetailsPage;
