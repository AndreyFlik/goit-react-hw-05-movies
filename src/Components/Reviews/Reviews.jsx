import React, { useState, useEffect } from "react";
import { ListGroup, Card } from "react-bootstrap";

const Reviews = ({ ReviewsId }) => {
  const [aboutFilm, setAboutFilm] = useState([]);
  const [error, setError] = useState(null);

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
        <ListGroup>
          {aboutFilm.map((actor) => (
            <ListGroup.Item key={actor.id}>
              <Card>
                <Card.Body>
                  <Card.Title>Author:</Card.Title>
                  <Card.Text>{actor.author}</Card.Text>
                  <Card.Title>Content:</Card.Title>
                  <Card.Text>{actor.content}</Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default Reviews;
