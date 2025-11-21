import { useEffect, useState } from "react";
import type { DogBreedData } from "../types/data";
import styles from "./BreedList.module.css";
import BreedCard from "./BreedCard";
import { dogApi } from "../utils/api";

export default function BreedList() {
  const [dogBreeds, setDogBreeds] = useState<[string, string[]][]>([]);
  const [search, setSearch] = useState("");

  const getDogBreeds = async () => {
    try {
      const res = await fetch(`${dogApi}/breeds/list/all`);

      if (!res.ok) throw new Error("Failed to fetch breeds");

      const data: DogBreedData = await res.json();
      const breedEntries = Object.entries(data.message);

      data.status === "success" ? setDogBreeds(breedEntries) : setDogBreeds([]);
    } catch (error) {
      console.error(error);
      setDogBreeds([]);
    }
  };

  useEffect(() => {
    getDogBreeds();
  }, []);

  return (
    <>
      <div>
        <label>Search breed</label>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
      </div>
      <ul className={styles.breeds}>
        {dogBreeds
          .filter((breed) => {
            return search.toLowerCase() === ""
              ? breed
              : breed[0].toLowerCase().includes(search);
          })
          .map(([breed, subBreeds]) => (
            <BreedCard key={breed} breed={breed} subBreeds={subBreeds} />
          ))}
      </ul>
    </>
  );
}
