"use client";
import { useState } from "react";
import pets from "../data/pets";
import PetItem from "./PetItem";
import SearchAndFilter from "./SearchAndFilter";

function PetsList({ pets }) {
  /* My states of type and search and adopt by click */
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [adoptedPets, setAdoptedPets] = useState([]);

  const handleAdopt = (petId) => {
    const confirmation = window.confirm(
      "Are you sure you want to adopt this pet ?"
    );
    if (confirmation) {
      setAdoptedPets((prevAdoptedPets) => [...prevAdoptedPets, petId]);
    }
  };

  const filteredPets = pets
    .filter((pet) => pet.name.toLowerCase().includes(query.toLowerCase()))
    .filter((pet) => type === "" || pet.type === type)
    .filter((pet) => !adoptedPets.includes(pet.id));

  const petList = filteredPets.map((pet) => (
    <PetItem pet={pet} key={pet.id} onAdopt={() => handleAdopt(pet.id)} />
  ));

  return (
    <>
      <SearchAndFilter setQuery={setQuery} setType={setType} />
      <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        {petList}
      </div>
    </>
  );
}

export default PetsList;
