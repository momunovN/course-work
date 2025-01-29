// Aside.js
import React from "react";

const Aside = ({
  selectedGenre,
  onGenreChange,
  selectedYear,
  onYearChange,
  genres,
  years,
}) => {
  return (
    <aside className="aside">
      <h2>Фильтры</h2>
      <div className="genre-select">
        <label htmlFor="genre">Жанр:</label>
        <select className="genre" id="genre" value={selectedGenre} onChange={onGenreChange}>
          {genres.map((genre, index) => (
            <option key={index} value={genre} className="genre-text" >
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-year">
        <label htmlFor="year">Год:</label>
        <select className="select-year" id="year" value={selectedYear} onChange={onYearChange}>
          {years.map((year, index) => (
            <option className="year-text" key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default Aside;
