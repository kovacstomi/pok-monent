import { PokemonProvider } from "../pokemonProvider";

type ResourcePage = {
  count: number;
  results: { name: string; url: string }[];
};

type RestAPIPokemon = {
  name: string;
  sprites: { other: { "official-artwork": { front_default?: string } } };
};

class RestPokemonProvider implements PokemonProvider {
  async fetchAllPokemons() {
    const queryParams = new URLSearchParams({ limit: "10000" });

    const response: Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch all Pokémon");
    }

    const page: ResourcePage = await response.json();

    return page.results.map(({ name }) => name);
  }

  async fetchPokemon(name: string) {
    const response: Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    if (!response.ok) {
      throw new Error(`Could not fetch Pokémon: ${name}`);
    }

    const pokemon: RestAPIPokemon = await response.json();

    return {
      name: pokemon.name,
      imageURL: pokemon.sprites.other["official-artwork"].front_default,
    };
  }
}

const restPokemonProviderInstance = new RestPokemonProvider();

export default restPokemonProviderInstance;
