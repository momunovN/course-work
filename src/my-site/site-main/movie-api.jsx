import APiJson from "../APi/movies_rus2.json";
import { useState, useEffect } from "react";
import Aside from "./aside"; // Импортируем новый компонент
import MovieDetail from "./MovieDetail"; // Импортируем новый компонент для деталей фильма

import ticket from "../images/ticket.svg"
import Watch from "../images/I'll-watch.svg"

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
        <div className="title-all">


          <div>


            <h1 className="title-movie-item">Билеты на кино</h1>
            <h5 className="title-movie-item2">Новинки, ожидаемые премьеры, хиты проката и другие фильмы, которые сейчас идут в кино.</h5>
          </div>

          <button className="my-tickets">
            <img src={ticket} alt="" className="img-my-ticket" style={{ fill: 'currentColor' }}/>
          Мои билеты
          </button>
        </div>
        <div className="all-content">
          {filteredMovies.slice(0, visibleCount).length > 0 ? (
            filteredMovies.slice(0, visibleCount).map((movie) => (
              <div className="movie-poster-info" key={movie.title}>
                <div className="movie-poster-item">


                  <div className="image-cont">
                    <img
                      className="poster-image"
                      src={movie.poster}
                      alt={movie.title}
                    />
                  </div>

                  <div className="movie-info">
                    <div>


                      <h2 className="movie-title">{movie.title}</h2>
                      <p>{movie.year}</p>
                      <p>{movie.genre}</p>
                    </div>
                    <button onClick={() => handleMovieClick(movie)} className="btn-buy " >
                      <img src={ticket} alt="" className="img-buy-ticket"/>
                      Купить билет</button>
                  </div>
                </div>


                <button className="movie-watch">

                  <img src={Watch} alt="" className="img-watch" />
                  Буду смотреть
                </button>
              </div>


            ))
          ) : (
            <p>Фильмы не найдены</p>
          )}
        </div>
        {filteredMovies.length > visibleCount && (
          <button onClick={handleShowMore} style={{ marginTop: "20px", color: "black" }}>
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