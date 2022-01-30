import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
const HomePage = ({ url, apiKey }) => {
  const loc = useLocation();

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
    <Container>
      <h1 className="h1">Популярные кинофильмы</h1>
      <ListGroup>
        {trendFilms.map((film) => (
          <ListGroup.Item key={film.id}>
            <Link
              className="nav-link"
              to={{
                pathname: `/movies/${film.id}`,
                state: { from: loc.pathname },
              }}
            >
              --{film.title}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default HomePage;
