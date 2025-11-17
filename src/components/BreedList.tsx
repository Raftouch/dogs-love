import { useEffect, useState } from "react";
import type { DogBreedData } from "../types/data";
import styles from "./BreedList.module.css";
import BreedCard from "./BreedCard";

export default function BreedList() {
  const [dogBreeds, setDogBreeds] = useState<[string, string[]][]>([]);

  const getDogBreeds = async () => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/list/all");

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
    <ul className={styles.breeds}>
      {dogBreeds.map(([breed, subBreeds]) => (
        <BreedCard key={breed} breed={breed} subBreeds={subBreeds} />
      ))}
    </ul>
  );
}
