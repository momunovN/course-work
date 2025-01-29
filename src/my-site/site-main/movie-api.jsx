import APiJson from "../APi/movies_rus2.json";
import { useState, useEffect } from "react";
import Aside from "./aside"; // Импортируем новый компонент
import MovieDetail from "./MovieDetail"; // Импортируем новый компонент для деталей фильма

import "./index.scss";

const MovieList = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Все Жанры");
  const [selectedYear, setSelectedYear] = useState("Все");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedMovie, setSelectedMovie] = useState(null); // Состояние для выбранного фильма

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setVisibleCount(12);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setVisibleCount(12);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  useEffect(() => {
    const filtered = APiJson.filter((movie) => {
      const isYearMatch = selectedYear === "Все" || movie.year === selectedYear;
      const isGenreMatch =
        selectedGenre === "Все Жанры" || movie.genre.includes(selectedGenre);
      return isYearMatch && isGenreMatch;
    });

    setFilteredMovies(filtered);
  }, [selectedGenre, selectedYear]);

  const genres = Array.from(
    new Set(APiJson.flatMap((movie) => movie.genre.split(", ")))
  )
    .filter((genre) => genre.trim() !== "")
    .concat("Все Жанры");

  const years = Array.from(new Set(APiJson.map((movie) => movie.year)))
    .sort((a, b) => b - a)
    .concat("Все");

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Устанавливаем выбранный фильм
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null); // Закрываем детали фильма
  };

  return (
    <div className="aside-movies">
      <Aside
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        genres={genres}
        years={years}
      />
      <div className="movies-item">
        <h1>Билеты на кино</h1>
        <div className="all-content">
          {filteredMovies.slice(0, visibleCount).length > 0 ? (
            filteredMovies.slice(0, visibleCount).map((movie) => (
              <div className="movie-poster-info" key={movie.title}>
                <div className="image-cont">
                  <img
                    className="poster-image"
                    src={movie.poster}
                    alt={movie.title}
                  />
                </div>

                <div className="movie-info">
                  <h2 className="movie-title">{movie.title}</h2>
                  <p>{movie.year}</p>
                  <p>{movie.genre}</p>
                  <button onClick={() => handleMovieClick(movie)}>Купить билет</button>
                </div>
              </div>
            ))
          ) : (
            <p>Фильмы не найдены</p>
          )}
        </div>
        {filteredMovies.length > visibleCount && (
          <button onClick={handleShowMore} style={{ marginTop: "20px" }}>
            Показать еще
          </button>
        )}
      </div>
      {selectedMovie && ( // Если выбран фильм, показываем детали
        <MovieDetail movie={selectedMovie} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default MovieList;