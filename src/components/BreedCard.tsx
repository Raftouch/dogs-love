import { useEffect, useState } from "react";
import styles from "./BreedCard.module.css";
import type { ImageData } from "../types/data";

type BreedCardProps = {
  breed: string;
  subBreeds: string[];
};

export default function BreedCard({ breed, subBreeds }: BreedCardProps) {
  const [breedImage, setBreedImage] = useState("");

  const getBreedImage = async () => {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data: ImageData = await res.json();
    setBreedImage(data.message);
  };

  useEffect(() => {
    getBreedImage();
  }, []);

  return (
    <li>
      <strong>{breed}</strong>
      <img height={150} src={breedImage} alt="breed photo" />
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
  );
}
