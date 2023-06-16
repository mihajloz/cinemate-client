import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Img src={movie.image}></Card.Img>
        <Card.Title>Title: {movie.title}</Card.Title>
        <Card.Text>Description: {movie.description}</Card.Text>
        <Card.Text>Genre: {movie.genre}</Card.Text>
        <Card.Text>Director: {movie.director}</Card.Text>
        <Button variant="primary" onClick={onBackClick}>
          Back
        </Button>
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
  onBackClick: PropTypes.func.isRequired,
};
