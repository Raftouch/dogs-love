import { useEffect, useState } from "react";
import styles from "./BreedCard.module.css";
import type { ImageData } from "../types/data";

type BreedCardProps = {
  breed: string;
  subBreeds: string[];
};

export default function BreedCard({ breed, subBreeds }: BreedCardProps) {
  const [breedImage, setBreedImage] = useState<string | null>(null);

  const getBreedImage = async () => {
    try {
      const res = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );

      if (!res.ok) throw new Error("Failed to fetch breed images");

      const data: ImageData = await res.json();

      data.status === "success"
        ? setBreedImage(data.message)
        : setBreedImage(null);
    } catch (error) {
      console.error(error);
      setBreedImage(null);
    }
  };

  useEffect(() => {
    getBreedImage();
  }, [breed]);

  return (
    <li className={styles.card}>
      <strong className={styles.breedName}>{breed}</strong>
      {breedImage ? (
        <img className={styles.image} src={breedImage} alt={`${breed} photo`} />
      ) : (
        <p>No image available</p>
      )}
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
