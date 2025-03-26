import React, { useState, useEffect } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'X-API-KEY': 'TMGNH2Y-66RMEVW-J3Q0Y7D-WEMHYKE'
          }
        };

        const response = await fetch('https://api.kinopoisk.dev/v1.4/movie?page=1&limit=12', options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.docs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="movie-list">
      <h1>Фильмы с Kinopoisk API</h1>
      <div className="movies-container">
        {movies.slice(0, 12).map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-poster-container">
              {movie.poster?.url ? (
                <img 
                  src={movie.poster.url} 
                  alt={movie.name || 'Постер фильма'} 
                  className="movie-poster"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x450?text=Постер+не+доступен';
                  }}
                />
              ) : (
                <div className="poster-placeholder">
                  <span>Постер отсутствует</span>
                </div>
              )}
            </div>
            
            <h2>{movie.name || movie.alternativeName || 'Название неизвестно'}</h2>
            
            <div className="movie-details">
              <p><strong>Год:</strong> {movie.year}</p>
              <p><strong>Страна:</strong> {movie.countries?.map(c => c.name).join(', ') || 'Не указано'}</p>
              <p><strong>Режиссер:</strong> {movie.persons?.filter(p => p.enProfession === 'director').map(d => d.name).join(', ') || 'Не указан'}</p>
              <p><strong>Время:</strong> {movie.movieLength ? `${movie.movieLength} мин.` : 'Не указано'}</p>
              <p><strong>Рейтинг KP:</strong> {movie.rating?.kp ? movie.rating.kp.toFixed(1) : 'Нет оценки'}</p>
              <p><strong>Рейтинг IMDB:</strong> {movie.rating?.imdb ? movie.rating.imdb.toFixed(1) : 'Нет оценки'}</p>
              <p><strong>Жанры:</strong> {movie.genres?.map(g => g.name).join(', ') || 'Не указаны'}</p>
              
              <div className="movie-description">
                <h4>Описание:</h4>
                <p>{movie.description || 'Описание отсутствует'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;