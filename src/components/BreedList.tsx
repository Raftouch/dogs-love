import { useEffect, useState } from "react";

export default function BreedList() {
  const [breed, setBreed] = useState();

  const getDogBreeds = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();

    console.log("data : ", data);
  };

  useEffect(() => {
    getDogBreeds();
  }, []);

  return <div>Dog Breeds</div>;
}
