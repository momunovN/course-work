import React, {useState, useEffect} from "react";



const MoviesByGenre = ({ genre, apiKey }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await fetch(
          `https://api.kinopoisk.dev/v1.4/movie?genres.name=${encodeURIComponent(
            genre
          )}`,
          {
            headers: {
              "X-API-KEY": apiKey,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const data = await response.json();
        setMovies(data.docs.slice(0, 10)); // Ограничиваем до 10 фильмов
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [genre, apiKey]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h1>Фильмы в жанре: {genre}</h1>
      <div>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.name}</h2>
              <p>
                <strong>Год:</strong> {movie.year}
              </p>
              <p>
                <strong>Страна:</strong> {movie.country}
              </p>
              {movie.poster && <img src={movie.poster.url} alt={movie.name} />}
              <p>
                <strong>Режиссёры:</strong>{" "}
                {movie.directors && movie.directors.length > 0
                  ? movie.directors.map((director) => director.name).join(", ")
                  : "Неизвестно"}
              </p>
              <p>
                <strong>Сюжет:</strong> {movie.description || "Нет описания"}
              </p>
            </div>
          ))
        ) : (
          <p>Фильмы не найдены.</p>
        )}
      </div>
    </div>
  );
};

export default MoviesByGenre;
