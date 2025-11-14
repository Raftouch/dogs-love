import { useEffect, useState } from "react";
import type { DogBreedData } from "../types/data";
import styles from "./BreedList.module.css";

export default function BreedList() {
  const [dogs, setDogs] = useState<[string, string[]][]>([]);

  const getDogBreeds = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data: DogBreedData = await res.json();
    const breedEntries = Object.entries(data.message);

    // console.log("data : ", data);
    console.log("breed entries : ", breedEntries);
    setDogs(breedEntries);
  };

  useEffect(() => {
    getDogBreeds();
  }, []);

  return (
    <div className="breed-list">
      <h1>Dog Breeds</h1>
      <ul className={styles.breeds}>
        {dogs.map(([breed, subBreeds]) => (
          <li key={breed}>
            <strong>{breed}</strong>
            {subBreeds.length > 0 ? (
              <ul className={styles.subbreeds}>
                {subBreeds.map((sub) => (
                  <li key={sub}>{sub}</li>
                ))}
              </ul>
            ) : (
              "No subbreeds available"
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
