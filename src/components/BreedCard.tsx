import styles from "./BreedCard.module.css";

type BreedCardProps = {
  breed: string;
  subBreeds: string[];
};

export default function BreedCard({ breed, subBreeds }: BreedCardProps) {
  return (
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
  );
}
