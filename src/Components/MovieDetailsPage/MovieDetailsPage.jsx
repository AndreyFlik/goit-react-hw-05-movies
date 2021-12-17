import s from "./MovieDetailsPage.module.css";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [aboutFilm, setAboutFilm] = useState([]);

  // const [ganres, setGanres] = useState([]);
  // console.log(ganres);
  // aboutFilm.genres.map((genre) => setGanres(genre));

  useEffect(() => {
    const feMov = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=152bf83924057aa5fa2efb38cb6db510`
      );
      if (res.status.ok) {
        return Promise.reject("Oops, something went wrong");
      }
      return res.json();
    };
    feMov()
      .then((Filminfo) => setAboutFilm(Filminfo))
      .catch((error) => console.log(error.message));
  }, [movieId]);

  return (
    <>
      {aboutFilm.length !== 0 && (
        <div className={s.Wrap}>
          <div>
            <button type="button">Вернуться назад</button>
            <img
              src={`https://image.tmdb.org/t/p/w300/${aboutFilm.poster_path}`}
              alt={aboutFilm.original_title}
            />
          </div>
          <div>
            <h2 className={s.Title}>{aboutFilm.original_title}</h2>
            <p className={s.rate}>{`Рейтинг ${aboutFilm.popularity}`}</p>
            <h3 className={s.Title}>Описание</h3>
            <p className={s.about}>{aboutFilm.overview}</p>
            <h4 className={s.GanreTitle}>Жанры:</h4>
            <div className={s.list}>
              {aboutFilm.genres.map(({ id, name }) => (
                <p className={s.listIndent} key={id}>
                  {name}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
