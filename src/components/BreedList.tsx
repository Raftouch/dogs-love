import { useEffect, useState } from "react";
import type { DogBreedData } from "../types/data";

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

  return <div></div>;
}
