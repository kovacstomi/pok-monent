import { Pokemon, PokemonProvider } from "../pokemon_providers/pokemonProvider";

const BULBASAUR: Pokemon = {
  name: "bulbasaur",
  imageURL:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
};

const BULBASAUR_PROVIDER: PokemonProvider = {
  fetchAllPokemons: () => Promise.resolve([BULBASAUR.name]),
  fetchPokemon: () => Promise.resolve(BULBASAUR),
};

const ERROR_PROVIDER: PokemonProvider = {
  fetchAllPokemons: () => Promise.reject(""),
  fetchPokemon: () => Promise.reject(""),
};

const LOADING_IMG = "http://localhost/poke_ball.png";
const ERROR_IMG = "http://localhost/error.webp";

export {
  BULBASAUR,
  BULBASAUR_PROVIDER,
  ERROR_PROVIDER,
  LOADING_IMG,
  ERROR_IMG,
};
