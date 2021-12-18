import s from "./MovieDetailsPage.module.css";
import {
  Link,
  Route,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
  Switch,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
// console.log(Cast);

const MovieDetailsPage = () => {
  const { url } = useRouteMatch();
  // console.log(`URL`, url);

  const loc = useLocation();
  console.log("MOVIES--FILMS", loc);

  const history = useHistory();

  const { movieId } = useParams();

  const [aboutFilm, setAboutFilm] = useState(null);
  const [saveState, setSaveState] = useState("");

  useEffect(() => {
    const feMov = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=152bf83924057aa5fa2efb38cb6db510`
      );
      if (res.status.ok) {
        return Promise.reject(new Error("Oops, something went wrong"));
      }
      return res.json();
    };
    feMov()
      .then((Filminfo) => setAboutFilm(Filminfo))
      .catch((error) => console.log(error.message));
  }, [movieId]);

  useEffect(() => {
    // console.log(loc);
    if (!loc.state) {
      return;
    }
    setSaveState(loc.state);
  }, [loc]);
  // console.log(saveState);

  const onGoBack = () => {
    history.push(loc?.state?.from ?? "/");
  };

  return (
    <>
      {aboutFilm && (
        <div className={s.Wrap}>
          <div>
            {/* <button type="button" onClick={() => history.goBack()}>
              Вернуться назад
            </button> */}
            <button type="button" onClick={onGoBack}>
              Вернуться назад
            </button>
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
      <Link
        to={{
          pathname: `${url}/cast`,
          state: { from: loc.state.from },
        }}
        className={s.listIndent}
      >
        Cast
      </Link>
      {/* <Link to={`${url}/cast`} className={s.listIndent}>
        Cast
      </Link> */}
      <Link
        to={{
          pathname: `${url}/reviews`,
          state: { from: loc.state.from },
        }}
      >
        Reviews
      </Link>
      {/* <Link to={`${url}/reviews`}>Reviews</Link> */}
      <Switch>
        <Route path={`${url}/cast`}>
          <Cast castId={movieId} />
        </Route>
        <Route path={`${url}/reviews`}>
          <Reviews ReviewsId={movieId} />
        </Route>
      </Switch>
    </>
  );
};

export default MovieDetailsPage;
