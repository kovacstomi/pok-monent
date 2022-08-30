import usePokemonQuery from "../usePokemonQuery";

type ResourcePage = {
  count: number;
  results: { name: string; url: string }[];
};

const fetchPokemons = async () => {
  const queryParams = new URLSearchParams({ limit: "10000" });

  const response: Response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?${queryParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Could not fetch all Pokémon");
  }

  return response.json();
};

const usePokemonsQuery = () =>
  usePokemonQuery<ResourcePage, string>({ callbackFn: fetchPokemons });

export default usePokemonsQuery;
