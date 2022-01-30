import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const MovieDetailsPage = lazy(() =>
  import(
    "../MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage"*/
  )
);
const MoviesPage = lazy(() =>
  import("../MoviesPage/MoviesPage" /* webpackChunkName: "MoviesPage"*/)
);
const HomePage = lazy(() =>
  import("../HomePage/HomePage" /* webpackChunkName: "HomePage"*/)
);

const URL = "https://api.themoviedb.org/3/";
const API_KEY = "152bf83924057aa5fa2efb38cb6db510";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-2">
        <Container>
          <Nav variant="pills">
            <Nav.Item>
              <LinkContainer exact to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer exact to="/movies">
                <Nav.Link>Movies</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<h1>Загрузка</h1>}>
        <Switch>
          <Route exact path="/">
            <HomePage url={URL} apiKey={API_KEY} />
          </Route>
          <Route exact path="/movies">
            <MoviesPage url={URL} apiKey={API_KEY} />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <Redirect from="*" to="/" />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
