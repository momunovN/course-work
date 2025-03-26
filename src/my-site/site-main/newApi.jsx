// import MovieList from "./movie";
import MoviesByGenre from "../musor/kinoapi";

import "./index.scss";
import "../all-main.scss";

import Logo from "../images/logo.svg";
import Location from "../images/SVG-location.svg";
import profile from "../images/profile.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="" />
      <div className="link-main">
        <a href="" className="location">
          <img src={Location} alt="" /> Москва и МО
        </a>
        <div className="link">
          <a href="">Кинотеатры</a>
          <a href="">Акции</a>
          <a href="">Детям</a>
        </div>
      </div>
      <div className="profile">
        <img src={profile} alt="" />
        <p>Личный кабинет</p>
      </div>
    </header>
  );
};

const Theart = () => {
  const filmId = 5304486;
  return (
    <div className="Theart">
        <Header />
      <div className="constainer">
      <MoviesByGenre genre="криминал" apiKey="TMGNH2Y-66RMEVW-J3Q0Y7D-WEMHYKE" />
      </div>
    </div>
  );
};

export default Theart;
