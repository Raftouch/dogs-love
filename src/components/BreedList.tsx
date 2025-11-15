import { useEffect, useState } from "react";
import type { DogBreedData } from "../types/data";
import styles from "./BreedList.module.css";
import BreedCard from "./BreedCard";

export default function BreedList() {
  const [dogBreeds, setDogBreeds] = useState<[string, string[]][]>([]);

  const getDogBreeds = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data: DogBreedData = await res.json();
    const breedEntries = Object.entries(data.message);
    setDogBreeds(breedEntries);
  };

  useEffect(() => {
    getDogBreeds();
  }, []);

  return (
    <div className="breed-list">
      <h1>Dog Breeds</h1>
      <ul className={styles.breeds}>
        {dogBreeds.map(([breed, subBreeds]) => (
          <BreedCard key={breed} breed={breed} subBreeds={subBreeds} />
        ))}
      </ul>
    </div>
  );
}
