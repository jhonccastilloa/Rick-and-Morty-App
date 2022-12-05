import axios from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import useFetchLocationSearch from "../hooks/useFetchLocationSearch";
import { Location } from "../interfaces/Types";
import "./styles/locationSearch.css";

interface LocationSearchProps {
  setLocationValue: (value: string) => void;
  setLocation: (value: Location | null) => void;
  locationValue: string;
}
const LocationSearch = ({
  setLocationValue,
  setLocation,
  locationValue,
}: LocationSearchProps) => {
  const [nameValueLocation, setNameValueLocation] = useState<string>("");
  const inputValue = useRef<HTMLInputElement>(null);
  const dimensionName = useFetchLocationSearch();
  const [hasFocus, setFocus] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const locationValue = inputValue.current?.value;
    if (locationValue) {
      setLocationValue(locationValue);
      setFocus(false);
    }
  };
  const handleChangeNameValue = ({ target:{value} }: ChangeEvent<HTMLInputElement>) => {
    setNameValueLocation(value);
    setFocus(true)
  };
  const handleClickGetName = (value: string): void => {
    setNameValueLocation(value);
    setLocationValue(value);
    setFocus(false);
  };
  const timeOutSearch = () => {
    setTimeout(() => {
      setFocus(false);
    }, 200);
  };
  return (
    <form className="form__search" onSubmit={handleSubmit}>
      <div className="form__search-container">
        <input
          className="form__input"
          ref={inputValue}
          value={nameValueLocation}
          type="text"
          onChange={handleChangeNameValue}
          onFocus={() => setFocus(true)}
          onBlur={timeOutSearch}
          placeholder={hasFocus ? "" : "type a location name"}
        />
        {hasFocus && nameValueLocation && (
          <ul className="form__list">
            {dimensionName
              ?.filter((name) =>
                name.name
                  .toLocaleLowerCase()
                  .startsWith(nameValueLocation.toLocaleLowerCase())
              )
              .map((name) => (
                <li
                  className="form__item"
                  onClick={() => handleClickGetName(name.name)}
                  key={name.id}
                >
                  {name.name}
                </li>
              ))}
          </ul>
        )}
      </div>

      <button className="form__button ">Search</button>
    </form>
  );
};

export default LocationSearch;
