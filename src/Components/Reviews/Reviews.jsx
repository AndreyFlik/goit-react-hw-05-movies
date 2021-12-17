import React, { useState, useEffect } from "react";
import s from "./Reviews.module.css";

// 624860;
const Reviews = ({ ReviewsId }) => {
  const [aboutFilm, setAboutFilm] = useState([]);
  const [error, setError] = useState(null);
  console.log(aboutFilm.length);

  useEffect(() => {
    const feMov = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${ReviewsId}/reviews?api_key=152bf83924057aa5fa2efb38cb6db510`
      );
      if (res.status.ok) {
        return Promise.reject("Oops, something went wrong");
      }
      const data = await res.json();
      if (data.results.length === 0) {
        return Promise.reject(new Error("no-data"));
      }
      return data;
    };

    feMov()
      .then((Filminfo) => setAboutFilm(Filminfo.results))
      .catch((error) => setError(error.message));
  }, [ReviewsId]);

  return (
    <>
      {error === "no-data" && <h2>Нет рецензий</h2>}
      {aboutFilm.length !== 0 && (
        <ul className={s.Wrap}>
          {aboutFilm.map((actor) => (
            <li key={actor.id}>
              <h2 className={s.titleName}>author:</h2>
              <p>{actor.author}</p>
              <h2 className={s.titleName}>content:</h2>
              <p>{actor.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Reviews;
