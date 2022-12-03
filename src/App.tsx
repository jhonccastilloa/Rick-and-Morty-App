import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ErrorFetch from "./components/ErrorFetch";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";

interface Location {
  id: number;
  name: string;
  dimension: string;
  type: string;
  residents: string[];
}
function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [locationNumer, setLocationNumer] = useState<string>();
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    let URL: string;
    if (locationNumer) {
      URL = `https://rickandmortyapi.com/api/location/${locationNumer}`;
    } else {
      const randomLocation = Math.floor(Math.random() * 126) + 1;
      URL = `https://rickandmortyapi.com/api/location/${randomLocation}`;
    }
    getData(URL);
  }, [locationNumer]);

  const getData = (URL: string): void => {
    axios
      .get(URL)
      .then((res) => {
        setHasError(false);
        setLocation(res.data);
      })
      .catch(() => setHasError(true));
  };
  const inputValue = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.current?.value) return;
    setLocation(null);
    setLocationNumer(inputValue.current?.value);
  };

  return (
    <div className="App">
      <h1>Proyect 3</h1>
      <form onSubmit={handleSubmit}>
        <input ref={inputValue} type="text" />
        <button>Search</button>
      </form>
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
