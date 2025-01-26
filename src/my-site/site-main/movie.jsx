import React, {useCallback, useState, useEffect} from 'react';


import axios from 'axios';

const API_KEY = 'ab7fa0e1'; // Замените на ваш ключ API

const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// http://www.omdbapi.com/?apikey=${API_KEY}&s=movie&type=movie&y=2016-2025&page=${num}&language=ru

const App = () => {
  const [num, setNum] = useState(randomNumberInRange(1, 20)); // Инициализируем случайным числом
  const [movies, setMovies] = useState([]);
  
  const fetchMovies = useCallback(async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=movie&type=movie&y=2016-2025&page=${num}&language=ru`);
      setMovies(response.data.Search.slice(0, 8)); // Получаем первые 8 фильмов
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }, [num]); // Добавляем num в зависимости

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]); // Теперь fetchMovies в зависимостях

  const handleRandomNumber = () => {
    const newNum = randomNumberInRange(1, 20);
    setNum(newNum);
  };

  return (
    <div>
      <h1>Фильмы с 2015 года</h1>
      <button onClick={handleRandomNumber}>Сгенерировать случайный номер</button>
      <div style={{ display: ' flex', flexWrap: 'wrap' }}>
        {movies.map(movie => (
          <div key={movie.imdbID} style={{ margin: '10px', textAlign: 'center' }}>
            <img src={movie.Poster} alt={movie.Title} style={{ width: '150px', height: '225px' }} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
