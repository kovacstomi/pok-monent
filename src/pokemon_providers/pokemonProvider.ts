interface Pokemon {
  name: string;
  imageURL?: string;
}

interface PokemonProvider {
  fetchAllPokemons: () => Promise<string[]>;
  fetchPokemon: (name: string) => Promise<Pokemon>;
}

export type { PokemonProvider, Pokemon };
