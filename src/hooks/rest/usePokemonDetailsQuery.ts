import { useCallback } from "react";
import { generateRandomPokemonIndex } from "../../utils";
import usePokemonQuery from "../usePokemonQuery";
import usePokemonsQuery from "./usePokemonsQuery";

type RestAPIPokemon = {
  name: string;
  sprites: { other: { "official-artwork": { front_default?: string } } };
};

type Pokemon = {
  name: string;
  imageURL?: string;
};

const fetchPokemonByUrl = async (url: string): Promise<Pokemon> => {
  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch the Pokémon URL: ${url}`);
  }

  const pokemon: RestAPIPokemon = await response.json();

  return {
    name: pokemon.name,
    imageURL: pokemon.sprites.other["official-artwork"].front_default,
  };
};

const usePokemonDetailsQuery = () => {
  const pokemonsQuery = usePokemonsQuery();

  const fetchPokemon = useCallback(() => {
    const index = generateRandomPokemonIndex(pokemonsQuery.data!.count);
    const url = pokemonsQuery.data!.results[index].url;

    return fetchPokemonByUrl(url);
  }, [pokemonsQuery]);

  const pokemonQuery = usePokemonQuery<Pokemon, string>({
    callbackFn: fetchPokemon,
    enabled: pokemonsQuery.isSuccess,
  });

  return {
    pokemon: pokemonQuery.data,
    error: pokemonsQuery.error || pokemonQuery.error,
    isLoading: pokemonsQuery.isLoading || pokemonQuery.isLoading,
    isError: pokemonsQuery.isError || pokemonQuery.isError,
  };
};

export default usePokemonDetailsQuery;
