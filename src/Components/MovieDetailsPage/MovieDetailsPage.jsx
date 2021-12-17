import s from "./MovieDetailsPage.module.css";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";

const MovieDetailsPage = () => {
  const { url } = useRouteMatch();
  // console.log(url);

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
              src={
                aboutFilm.poster_path
                  ? `https://image.tmdb.org/t/p/w300/${aboutFilm.poster_path}`
                  : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
              }
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

      <h2>Дополнительная информация</h2>
      <Link to={`${url}/cast`} className={s.listIndent}>
        Cast
      </Link>
      <Link to={`${url}/reviews`}>Reviews</Link>
      <Route path={`${url}/cast`}>
        <Cast castId={movieId} />
      </Route>
      <Route path={`${url}/reviews`}>
        <Reviews ReviewsId={movieId} />
      </Route>
    </>
  );
};

export default MovieDetailsPage;
