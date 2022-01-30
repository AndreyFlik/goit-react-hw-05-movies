import {
  Container,
  ListGroup,
  Button,
  Card,
  Row,
  Stack,
} from "react-bootstrap";
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

const MovieDetailsPage = () => {
  const { url } = useRouteMatch();
  const loc = useLocation();
  const history = useHistory();
  const { movieId } = useParams();

  const [aboutFilm, setAboutFilm] = useState(null);

  useEffect(() => {
    const getDetailMov = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=152bf83924057aa5fa2efb38cb6db510`
      );
      if (res.status.ok) {
        return Promise.reject(new Error("Oops, something went wrong"));
      }
      return res.json();
    };
    getDetailMov()
      .then((Filminfo) => setAboutFilm(Filminfo))
      .catch((error) => console.log(error.message));
  }, [movieId]);

  const onGoBack = () => {
    history.push(loc?.state?.from ?? "/");
  };

  return (
    <>
      <Container>
        {aboutFilm && (
          <div>
            <Button type="button" onClick={onGoBack} className="mb-1">
              Вернуться назад
            </Button>
            <Card>
              <Stack direction="horizontal" gap={3}>
                <Card.Img
                  src={
                    aboutFilm.poster_path
                      ? `https://image.tmdb.org/t/p/w300/${aboutFilm.poster_path}`
                      : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                  }
                  alt={aboutFilm.original_title}
                  style={{ width: "18rem" }}
                />
                <Card.Body>
                  <Card.Title>{aboutFilm.original_title}</Card.Title>
                  <Card.Text>{`Рейтинг ${aboutFilm.popularity}`}</Card.Text>
                  <Card.Title>Описание</Card.Title>
                  <Card.Text>{aboutFilm.overview}</Card.Text>
                  <Card.Title>Жанры:</Card.Title>
                  {aboutFilm.genres.map(({ id, name }) => (
                    <Card.Text key={id}>{name}</Card.Text>
                  ))}
                </Card.Body>
              </Stack>
            </Card>
          </div>
        )}
        <h2 className="h3">Дополнительная информация:</h2>{" "}
        <Stack direction="horizontal" gap={3}>
          <Link
            className="nav-link"
            to={{
              pathname: `${url}/cast`,
              state: { from: loc.state.from },
            }}
          >
            Cast
          </Link>
          <Link
            className="nav-link"
            to={{
              pathname: `${url}/reviews`,
              state: { from: loc.state.from },
            }}
          >
            Reviews
          </Link>
        </Stack>
        <Switch>
          <Route path={`${url}/cast`}>
            <Cast castId={movieId} />
          </Route>
          <Route path={`${url}/reviews`}>
            <Reviews ReviewsId={movieId} />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default MovieDetailsPage;
