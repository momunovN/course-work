import APiJson from "../APi/movies_rus2.json";
import { useState, useEffect } from "react";

const MovieList = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Обработчик изменения ввода
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    // Выводим все фильмы для отладки
    console.log("All Movies:", APiJson);

    // Фильтруем фильмы по жанру "Боевик" и году, указанному в inputValue
    const filtered = APiJson.filter((movie) => {
      console.log("Checking movie:", movie); // Отладка: выводим каждый фильм
      return movie.genre.includes("Боевик") && movie.year === inputValue; // Сравниваем строки
    });

    console.log("Input Value:", inputValue); // Отладка: выводим значение inputValue
    console.log("Filtered Movies:", filtered); // Отладка: выводим отфильтрованные фильмы

    setFilteredMovies(filtered);
  }, [inputValue]); // Add inputValue as a dependency

  return (
    <div>
      <h1>Фильмы по жанру "Боевик" По годам</h1>

      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Введите год" // Optional placeholder for better UX
      />
      <select id="year" value={inputValue}
        onChange={handleInputChange}  >
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} style={{ margin: "10px", width: "200px" }}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "100%" }}
              />
              <h2>{movie.title}</h2>
              <p>{movie.year}</p>
              <p>{movie.plot}</p>
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
