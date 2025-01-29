import APiJson from "../APi/movies_rus2.json";
import { useState, useEffect } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // Состояние для сортировки

  useEffect(() => {
    // Выводим все фильмы для отладки


    // Перемешиваем массив фильмов
    const shuffledMovies = APiJson.sort(() => Math.random() - 0.1);

    // Ограничиваем количество фильмов до 20
    const selectedMovies = shuffledMovies.slice(0, 12);

    // Сортируем фильмы в зависимости от выбранного порядка
    const sortedMovies = selectedMovies.sort((a, b) => {
      return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
    });

    console.log("Sorted Movies:", sortedMovies); // Отладка: выводим отсортированные фильмы

    setMovies(sortedMovies);
  }, [sortOrder]); // Добавляем sortOrder как зависимость

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div>
      <h1>Случайные фильмы по жанру "Боевик"</h1>

      <label>
        Сортировка по году:
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </label>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} style={{ margin: "10px", width: "200px" }}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "100%" }}
              />
              <h2>{movie.title}</h2>
              <p>{movie.year}</p>
            {/* <p>{movie.plot}</p> */}
              <p>{movie.genre}</p> {/* Если genre - строка, просто выводим */}
            </div>
          ))
        ) : (
          <p>Фильмы не найдены</p> // Сообщение, если фильмы не найдены
        )}
      </div>
    </div>
  );
};

export default MovieList;