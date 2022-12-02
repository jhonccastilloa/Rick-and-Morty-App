import React, { useEffect, useState } from "react";
import axios from "axios";

interface ResidentCardProps {
  url: string;
}

interface Resident{
  name:string;
  image:string;
  status:string;
  species:string;
  location:{
    name:string
  };
  episode:string[]

}
const ResidentCard = ({ url }: ResidentCardProps) => {
  const [resident, setResident] = useState<Resident>();
  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    axios
      .get(url)
      .then((res) => setResident(res.data))
      .catch((err) => console.log(err));
  };
  console.log(resident);
  
  return (
    <article>
      
      <header>
        <img src={resident?.image} alt="" />
        <div>
          <span className="circle"></span>
          <span>{resident?.status}</span>
        </div>
      </header>
      <section>
        <h3>{resident?.name}</h3>
        <ul>
          <li><span>Species: </span>{resident?.species}</li>
          <li><span>Origin: </span>{resident?.location.name}</li>
          <li><span>Episodes where appear: </span>{resident?.episode.length}</li>
        </ul>
      </section>
    </article>
  );
};

export default ResidentCard;
