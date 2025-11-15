import { useEffect, useState } from "react";
import styles from "./BreedCard.module.css";

type BreedCardProps = {
  breed: string;
  subBreeds: string[];
};

export default function BreedCard({ breed, subBreeds }: BreedCardProps) {
  const [breedImage, setBreedImage] = useState("");

  // console.log("BREED : ", breed);
  // url: "https://dog.ceo/api/breed/whippet/images/random"

  const getBreedImage = async () => {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    // const data = await res.json();
    const data = await res.json();
    console.log("RES : ", data);
  };

  useEffect(() => {
    getBreedImage();
  }, []);

  return (
    <li>
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
  );
}
