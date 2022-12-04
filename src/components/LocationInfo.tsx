import './styles/locationInfo.css'

interface LocationInfoProp {
  location: {
    id: number;
    name: string;
    dimension: string;
    type: string;
    residents: string[];
  };
}

const LocationInfo = ({ location }: LocationInfoProp) => {
  return (
    <>
      <h2 className="location__title">{location.name}</h2>
      <ul className="location__list">
        <li className="location__item">
          <span className="location__label">Type </span>
          <span className="location_text">{location.type}</span>
          
        </li>
        <li className="location__item">
          <span className="location__label">Dimension </span>
          <span className="location_text">{location.dimension}</span>
          
        </li>
        <li className="location__item">
          <span className="location__label">Residents </span>
          <span className="location_text">{location.residents.length}</span>
          
        </li>
      </ul>
    </>
  );
};

export default LocationInfo;
