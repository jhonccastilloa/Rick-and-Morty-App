import axios from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import ErrorFetch from "./components/ErrorFetch";
import LocationInfo from "./components/LocationInfo";
import LocationSearch from "./components/LocationSearch";
import ResidentCard from "./components/ResidentCard";
import { Location } from "./interfaces/Types";


function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [locationValue, setLocationValue] = useState<string>("");
  const [hasError, setHasError] = useState(false);
 

  useEffect(() => {
    let URL: string;
    if (locationValue) {
      URL = `https://rickandmortyapi.com/api/location/?name=${locationValue}`;
      console.log(URL);
    } else {
      const randomLocation = Math.floor(Math.random() * 126) + 1;
      URL = `https://rickandmortyapi.com/api/location/${randomLocation}`;
    }
    getData(URL);
  }, [locationValue]);

  const getData = (URL: string): void => {
    axios
      .get(URL)
      .then((res) => {
        setHasError(false);
        locationValue
          ? setLocation(res.data.results[0])
          : setLocation(res.data);
      })
      .catch(() => setHasError(true));
  };
 

  return (
    <div className="App">
      <h1>Proyect 3</h1>
      <LocationSearch setLocationValue={setLocationValue} setLocation={setLocation}/>
      {hasError ? (
        <ErrorFetch />
      ) : (
        <>
          {location ? <LocationInfo location={location} /> : <p>Loading...</p>}
          {location?.residents.map((url) => (
            <ResidentCard key={url} url={url} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
