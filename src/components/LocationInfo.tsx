import React from "react";

interface LocationInfoProp {
  location: {
    id: number;
    name: string;
    dimension: string;
    type:string;
    residents:string[]
  };
}

const LocationInfo = ({ location }:LocationInfoProp) => {
  return (<div>
    <h2>{location.name}</h2>
    <ul>
      <li><span>Type: </span>{location.type}</li>
      <li><span>Dimension: </span>{location.dimension}</li>
      <li><span>Residents: </span>{location.residents.length}</li>
    </ul>
  </div>);
};

export default LocationInfo;
