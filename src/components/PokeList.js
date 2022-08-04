import { useEffect, useState } from "react";
import "./PokeList.css";
import PokemonCard from './PokemonCard';

function PokeList() {
const [allPokemons, setAllPokemons] = useState([]);
const [hide, setHide] = useState('hidden');

const getAllPokemons = async () => {
  const results = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0"
    );
  const data = await results.json();
  console.log(data);

  function createPokemonObject(results) {
    results.forEach(async (pokemon) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
      const data = await res.json();
      setAllPokemons((currentList) => [...currentList, data]);
      await allPokemons.sort((a,b) => a.id - b.id);
    });
  }
  createPokemonObject(data.results);
  console.log(allPokemons);
};

useEffect(function () {
  getAllPokemons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return(
    <div className="app-container">
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemonInfo) => (
            <PokemonCard
            key={pokemonInfo.name}
            id={pokemonInfo.id.toString().padStart(3, "0")}
            image={pokemonInfo.sprites.other["official-artwork"].front_default}
            name={pokemonInfo.name.replace(/^./, (str) => str.toUpperCase())}
            type={pokemonInfo.types[0].type.name}
            weight={pokemonInfo.weight}
            height={pokemonInfo.height}
            stats={pokemonInfo.stats.map((stat) => stat.base_stat).slice(0,3)}
            statsName={pokemonInfo.stats.map((stat) => stat.stat.name).slice(0,3)}
            />
          ))}
        </div>
        <button onClick={() => setHide('default')} className="hidden">{hide}</button>
      </div>
    </div>
  )
}



export default PokeList;