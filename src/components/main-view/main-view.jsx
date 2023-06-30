import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import FormControl from "react-bootstrap/FormControl";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [loading, setLoading] = useState(true);

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://cinemate.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie["_id"],
            image: movie.ImagePath,
            title: movie.Title,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
            description: movie.Description,
          };
        });

        setMovies(moviesFromApi);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, [token]);

  const filterMovies = (query) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <BrowserRouter>
      <Row>
        <Col>
          <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
              window.location.reload();
            }}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center" style={{ marginTop: "80px" }}>
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }}
                  updateUser={updateUser}
                />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      updateUser={setUser}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <FormControl
                      type="text"
                      placeholder="Search movies..."
                      onChange={(e) => filterMovies(e.target.value)}
                      style={{ marginBottom: "20px" }}
                    />
                    {filteredMovies.map((movie) => (
                      <Col
                        className="mb-4"
                        key={movie.id}
                        xs={12}
                        md={6}
                        lg={3}
                      >
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};
