import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ErrorFetch from "./components/ErrorFetch";
import Loader from "./components/Loader";
import LocationInfo from "./components/LocationInfo";
import LocationSearch from "./components/LocationSearch";
import Pagination from "./components/Pagination";
import ResidentCard from "./components/ResidentCard";
import usePagination from "./hooks/usePagination";
import { Location } from "./interfaces/Types";

function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [locationValue, setLocationValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  //pagination states
  const [numResidents, setNumResidents] = useState<number>(0);
  const numPagination = usePagination(numResidents);
  const [statePagination, setStatePagination] = useState<number>(0);

  useEffect(() => {
    let URL: string;
    setHasError(false);
    setLoading(true);
    setStatePagination(0);
    setNumResidents(0);
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
        if (locationValue) {
          setLocation(res.data.results[0]);
          setNumResidents(res.data.results[0].residents.length);
        } else {
          setLocation(res.data);
          setNumResidents(res.data.residents.length);
        }
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setNumResidents(0);
      });
  };

  const errorReload = () => {
    setHasError(false);
    setLocationValue("");
  };

  return (
    <div className="App">
      <header className="header container">
        <div className="header__background">
          <img className="header__img" src="/Rick.webp" alt="" />
          <figure className="header__figure">
            <img className="header__img-letter" src="/letter.png" alt="" />
          </figure>
          <img
            className="header__img header__img--rotate"
            src="/Morty.webp"
            alt=""
          />
        </div>
      </header>
      <h1 className="app__title">WIKI</h1>
      <main className="main">
        <section className="location__search container">
          <LocationSearch
            setLocationValue={setLocationValue}
            setLocation={setLocation}
            locationValue={locationValue}
          />
        </section>
        {hasError ? (
          <ErrorFetch errorReload={errorReload} />
        ) : !loading ? (
          <>
            {location && (
              <section className="section__location-info container">
                <LocationInfo location={location} />
              </section>
            )}
            <section id="cards" className="sections__cards container">
              {location?.residents
                .slice(0 + 9 * statePagination, 9 + 9 * statePagination)
                .map((url) => (
                  <ResidentCard key={url} url={url} />
                ))}
            </section>
          </>
        ) : (
          <section className="loading container">
            <Loader />
          </section>
        )}
        {(numPagination.length != 0) && (
          <section className="section__pagination container">
            <Pagination
              numPagination={numPagination}
              setStatePagination={setStatePagination}
              statePagination={statePagination}
            />
          </section>
        )}
      </main>
      <footer className="footer container">
          <p className="footer__text">Made with TypeScript, React, CSS and love ❤ at Academlo</p>
      </footer>
    </div>
  );
}

export default App;
