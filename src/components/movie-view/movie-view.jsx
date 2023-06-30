import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const [isFavorite, setIsFavorite] = useState(
    user && user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)
  );

  useEffect(() => {
    setIsFavorite(
      user && user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)
    );
    window.scrollTo(0, 0);
  }, [movieId]);

  const addFavorite = () => {
    fetch(
      `https://cinemate.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully added to favorites");
          setIsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavorite = () => {
    fetch(
      `https://cinemate.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully deleted from favorites");
          setIsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Img src={movie.image}></Card.Img>
        <Card.Title>Title: {movie.title}</Card.Title>
        <Card.Text>Description: {movie.description}</Card.Text>
        <Card.Text>Genre: {movie.genre}</Card.Text>
        <Card.Text>Director: {movie.director}</Card.Text>
        <Link to="/">
          <Button variant="link">Back</Button>
        </Link>
        {/* {isFavorite ? (
          <Button variant="danger" className="mx-2" onClick={removeFavorite}>
            Remove from Favorites
          </Button>
        ) : (
          <Button variant="success" className="mx-2" onClick={addFavorite}>
            Add to Favorites
          </Button>
        )} */}
        {isFavorite ? (
          <Button
            variant="danger"
            className="mt-2 mb-2 ms-2"
            onClick={removeFavorite}
          >
            Remove from favorites
          </Button>
        ) : (
          <Button
            variant="success"
            className="mt-2 mb-2 ms-2"
            onClick={addFavorite}
          >
            Add to favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};
