import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState } from "react";

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Inception",
      Description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      Genre: {
        Name: "Science Fiction",
        Description:
          "Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies.",
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Edward Nolan is a British-American film director, screenwriter, and producer.",
        Birth: "1970",
        Death: null,
      },
      ImagePath: "inception.png",
      Featured: true,
    },
    {
      id: 2,
      Title: "The Godfather",
      Description:
        "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
      Genre: {
        Name: "Crime",
        Description:
          "Crime films, in the broadest sense, are a cinematic genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.",
      },
      Director: {
        Name: "Francis Ford Coppola",
        Bio: "Francis Ford Coppola is an American film director, screenwriter and producer.",
        Birth: "1939",
        Death: null,
      },
      ImagePath: "thegodfather.png",
      Featured: true,
    },
    {
      id: 3,
      Title: "The Dark Knight",
      Description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      Genre: {
        Name: "Action",
        Description:
          "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Edward Nolan is a British-American film director, screenwriter, and producer.",
        Birth: "1970",
        Death: null,
      },
      ImagePath: "thedarkknight.png",
      Featured: true,
    },
  ]);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
