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

interface LocationSearchProps {
  setLocationValue: (value: string) => void;
  setLocation: (value: Location | null) => void;
}
const LocationSearch = ({
  setLocationValue,
  setLocation,
}: LocationSearchProps) => {
  const [nameValueLocation, setNameValueLocation] = useState<string>("");
  const inputValue = useRef<HTMLInputElement>(null);
  const dimensionName=useFetchLocationSearch()
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const locationValue = inputValue.current?.value;
    if (!locationValue) return;
    setLocationValue(locationValue);
    setLocation(null);
  };
  const handleChangeNameValue = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setNameValueLocation(value);
  };
  const handleClickGetName = (value: string): void => {
    setNameValueLocation(value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputValue}
        value={nameValueLocation}
        type="text"
        onChange={handleChangeNameValue}
      />
      <button>Search</button>
      {nameValueLocation && (
        <ul>
          {dimensionName
            ?.filter((name) =>
              name.name
                .toLocaleLowerCase()
                .includes(nameValueLocation.toLocaleLowerCase())
            )
            .map((name) => (
              <li onClick={() => handleClickGetName(name.name)} key={name.id}>
                {name.name}
              </li>
            ))}
        </ul>
      )}
    </form>
  );
};

export default LocationSearch;
