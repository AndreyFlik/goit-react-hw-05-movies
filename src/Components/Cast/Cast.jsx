import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// 624860;
const Cast = ({ castId }) => {
  // console.log(`Попали в cast`);
  const [aboutFilm, setAboutFilm] = useState(null);
  const loc = useLocation();

  useEffect(() => {
    // console.log(`Запрашиваем api`);
    const feMov = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${castId}/credits?api_key=152bf83924057aa5fa2efb38cb6db510`
      );
      if (res.status.ok) {
        return Promise.reject("Oops, something went wrong");
      }
      return res.json();
    };

    feMov()
      .then((Filminfo) => setAboutFilm(Filminfo.cast))
      .catch((error) => console.log(error.message));
  }, [castId]);
  // console.log(`Рендерим каст`);
  return (
    <>
      {aboutFilm && (
        <ul>
          {aboutFilm.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                    : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                }
                alt={actor.original_name}
              />
              <p>{actor.original_name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
