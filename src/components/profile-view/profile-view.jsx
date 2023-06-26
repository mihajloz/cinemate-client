import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({
  user,
  token,
  movies,
  onLoggedOut,
  updateUser,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  let favoriteMovies = [];
  if (user && user.FavoriteMovies && movies) {
    favoriteMovies = movies.filter((movie) =>
      user.FavoriteMovies.includes(movie.id)
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthdate,
    };

    fetch(`https://cinemate.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to change user data");
        }
      })
      .then((user) => {
        if (user) {
          alert("User data updated");
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const deleteAccount = () => {
    fetch(`https://cinemate.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("The account has been deleted.");
          onLoggedOut();
        } else {
          throw new Error("Failed to delete account");
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <>
      <Col md={6}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title>Your info</Card.Title>
            <p>Username: {user && user.Username}</p>
            <p>Email: {user && user.Email}</p>
            <p>
              Birthdate: {user && user.Birthday && user.Birthday.slice(0, 10)}
            </p>
          </Card.Body>
        </Card>
        <Button
          variant="danger"
          onClick={() => {
            if (confirm("Are you sure?")) {
              deleteAccount();
            }
          }}
        >
          Delete user account
        </Button>
      </Col>
      <Col md={6}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title>Update your info</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="5"
                  className="bg"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="5"
                  className="bg"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                  className="bg"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12}>
        <h3 className="mt-3 mb-3">Your favorite movies:</h3>
      </Col>
      {favoriteMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </>
  );
};
