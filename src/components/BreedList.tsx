import { useState } from "react";
import styles from "./BreedList.module.css";
import BreedCard from "./BreedCard";
import { useQuery } from "@tanstack/react-query";
import { getDogBreeds } from "../api/dogBreeds";

export default function BreedList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const breedsPerPage = 10;

  const { data, status, error } = useQuery({
    queryKey: ["dogBreeds"],
    queryFn: getDogBreeds,
  });

  if (status === "pending") return <>Loading...</>;
  if (status === "error" && error instanceof Error) return <>{error.message}</>;

  const breedEntries = data ? Object.entries(data.message) : [];

  const filteredBreeds = breedEntries.filter((breed) => {
    return breed[0].toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredBreeds.length / breedsPerPage);
  const breedsPaginated = filteredBreeds.slice(
    (page - 1) * breedsPerPage,
    page * breedsPerPage
  );

  const toNextPage = () => setPage(page + 1);
  const toPrevPage = () => setPage(page - 1);

  return (
    <>
      <div className={styles.searchBar}>
        <label>Search breed</label>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
      <ul className={styles.breeds}>
        {breedsPaginated.map(([breed, subBreeds]) => (
          <BreedCard key={breed} breed={breed} subBreeds={subBreeds} />
        ))}
      </ul>

      <div>
        <button disabled={page === 1} onClick={toPrevPage}>
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={toNextPage}>
          Next
        </button>
      </div>
    </>
  );
}
