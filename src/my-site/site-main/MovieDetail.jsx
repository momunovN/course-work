// MovieDetail.js
import React, { useState } from "react";
import "./MovieDetail.scss"; // Импортируйте стили, если нужно

const MovieDetail = ({ movie, onClose }) => {
  const [ticketPurchased, setTicketPurchased] = useState(false);

  const handlePurchase = () => {
    setTicketPurchased(true);
  };

  return (
    <div className="movie-detail-overlay">
      <div className="movie-detail">
        {ticketPurchased ? (
          <div className="purchase-message">
            <h2>Билет куплен!</h2>
            <p>Приятного просмотра!</p>
            <button onClick={onClose}>Закрыть</button>
          </div>
        ) : ( 
          <>
          <img src={movie.poster} alt="" />
            <h2>{movie.title}</h2>
            <p>Год: {movie.year}</p>
            <p>Жанр: {movie.genre}</p>
            <p>Сюжет: <br />{movie.plot}</p>
            <button onClick={handlePurchase}>Купить билет</button>
            <button onClick={onClose}>Закрыть</button>
          </>
        )}
      </div>
    </div>
  );
};




export default MovieDetail;