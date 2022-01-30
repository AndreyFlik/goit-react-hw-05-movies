import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { Button, Container, Form, ListGroup } from "react-bootstrap";

const MoviesPage = ({ url, apiKey }) => {
  const history = useHistory();

  const match = useRouteMatch();
  const loc = useLocation();

  const [queryName, setQueryName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchFilms, setSearchFilms] = useState([]);

  const serchInputValue = new URLSearchParams(loc.search).get("query");

  useEffect(() => {
    if (serchInputValue === null) {
      return;
    }
    setSearchName(serchInputValue);
  }, [serchInputValue]);

  const handleChange = (e) => {
    setQueryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryName.trim() === "") {
      alert(`Введите запрос`);
    } else {
      setSearchName(queryName);
      history.push({
        ...loc,
        search: `query=${queryName}`,
      });
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
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Поиск фильма</Form.Label>
            <Form.Control
              className="mb-3"
              onChange={handleChange}
              value={queryName}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search your Movies"
              name="name"
            />
            <Button variant="primary" type="submit">
              Поиск
            </Button>
          </Form.Group>
        </Form>
        {searchFilms.length !== 0 && (
          <ListGroup>
            {searchFilms.map((film) => (
              <ListGroup.Item key={film.id}>
                <Link
                  className="nav-link"
                  to={{
                    pathname: `${match.url}/${film.id}`,
                    state: { from: loc.pathname + loc.search },
                  }}
                >
                  --{film.title}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
    </>
  );
};

export default MoviesPage;
