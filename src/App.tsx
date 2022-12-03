import axios from "axios";
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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
interface DimensionName {
  id: number;
  name: string;
}
function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [locationValue, setLocationValue] = useState<string>();
  const [hasError, setHasError] = useState(false);
  const [dimensionName, setDimensionName] = useState<DimensionName[]>();
  const [nameValueLocation, setNameValueLocation] = useState<string>("");
  useEffect(() => {
    const locationNumbers = [];
    for (let i = 1; i < 127; i++) {
      locationNumbers.push(i);
    }
    const URL = `https://rickandmortyapi.com/api/location/${locationNumbers}`;
    axios
      .get(URL)
      .then((res) => setDimensionName(res.data))
      .catch((err) => console.log(err));
  }, []);
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
        setLocation(res.data.results[0]);
        console.log(res.data);
      })
      .catch(() => setHasError(true));
  };
  const inputValue = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.current?.value) return;
    setLocationValue(inputValue.current?.value);
    setLocation(null);
  };
  const handleChangeNameValue = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setNameValueLocation(value);
  };
  const handleClickGetName = (value: string): void => {
    console.log(value);
    setNameValueLocation(value);
  };
  // console.log(dimensionName);
  // console.log("location: ",location);

  return (
    <div className="App">
      <h1>Proyect 3</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputValue}
          value={nameValueLocation}
          type="text"
          onChange={handleChangeNameValue}
        />
        <button>Search</button>
       {nameValueLocation && (<ul>
          {dimensionName?.filter(name => (name.name.toLocaleLowerCase()).includes(nameValueLocation.toLocaleLowerCase())).map(name=>(
            <li onClick={() => handleClickGetName(name.name)} key={name.id}>
              {name.name}
            </li>
          ))}
        </ul>)}
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
