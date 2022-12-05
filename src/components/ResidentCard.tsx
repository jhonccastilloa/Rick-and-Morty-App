import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles/residentCard.css'
interface ResidentCardProps {
  url: string;
}

interface Resident {
  name: string;
  image: string;
  status: string;
  species: string;
  location: {
    name: string;
  };
  episode: string[];
}
const ResidentCard = ({ url }: ResidentCardProps) => {
  const [resident, setResident] = useState<Resident>();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(url)
      .then((res) => setResident(res.data))
      .catch((err) => console.log(err));
  };
  
  return (
    <div className="card__container ">
      <header className="card__header">
        <img className="card__image" src={resident?.image} alt={resident?.name} />
        <div className="card__circle-info">
          <div className={`card__circle ${resident?.status}`}></div>
          <span className="card__text">{resident?.status}</span>
        </div>
      </header>
      <main className="card__body">
        <h3 className="card__title">{resident?.name}</h3>
        <hr className="card__hr"/>
        <ul className="card__list">
          <li className="card_item">
            <span className="card__label">Species: </span>
            <span className="card__item-text">{resident?.species}</span>
          </li>
          <li className="card_item">
            <span className="card__label">Origin: </span>
            <span className="card__item-text">{resident?.location.name}</span>
          </li>
          <li className="card_item">
            <span className="card__label">Episodes where appear: </span>
            <span className="card__item-text">{resident?.episode.length}</span>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default ResidentCard;
