import axios from "axios";
import { useEffect, useState } from "react";
interface DimensionName {
  id: number;
  name: string;
}
const useFetchLocationSearch = () => {
  const [dimensionName, setDimensionName] = useState<DimensionName[]>([]);

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

  return dimensionName;
};

export default useFetchLocationSearch;
