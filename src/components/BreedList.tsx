import { useState } from "react";
import styles from "./BreedList.module.css";
import BreedCard from "./BreedCard";
import { useQuery } from "@tanstack/react-query";
import { getDogBreeds } from "../api/dogBreeds";

export default function BreedList() {
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["dogBreeds"],
    queryFn: getDogBreeds,
  });

  if (isLoading) return <>Loading...</>;
  if (error instanceof Error) return <>{error.message}</>;

  const breedEntries = data ? Object.entries(data.message) : [];

  const filteredBreeds = breedEntries.filter((breed) => {
    return breed[0].toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className={styles.searchBar}>
        <label>Search breed</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul className={styles.breeds}>
        {filteredBreeds.map(([breed, subBreeds]) => (
          <BreedCard key={breed} breed={breed} subBreeds={subBreeds} />
        ))}
      </ul>
    </>
  );
}
