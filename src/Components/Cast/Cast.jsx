import React, { useState, useEffect } from "react";
import { ListGroup, Card } from "react-bootstrap";

const Cast = ({ castId }) => {
  const [aboutFilm, setAboutFilm] = useState(null);

  useEffect(() => {
    const getActor = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${castId}/credits?api_key=152bf83924057aa5fa2efb38cb6db510`
      );
      if (res.status.ok) {
        return Promise.reject("Oops, something went wrong");
      }
      return res.json();
    };

    getActor()
      .then((Filminfo) => setAboutFilm(Filminfo.cast))
      .catch((error) => console.log(error.message));
  }, [castId]);
  return (
    <>
      {aboutFilm && (
        <ListGroup className="d-flex flex-wrap" horizontal>
          {aboutFilm.map((actor) => (
            <ListGroup.Item key={actor.id}>
              <Card style={{ width: "15rem" }}>
                <Card.Img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                      : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                  }
                  alt={actor.original_name}
                />
                <Card.Text>{actor.original_name}</Card.Text>
                <Card.Text>{actor.character}</Card.Text>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default Cast;
