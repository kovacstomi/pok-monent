# Pokémonent

React component to display a random Pokémon available in movies, series and video game franchise. Powered by [PokéAPI](https://pokeapi.co/).

## Usage

To use it import the `Pokemonent` and create a Pokémon provider or use one of the pre-built providers.

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Pokemonent, RestPokemonProvider } from "react-highlight-words";

const root = createRoot(document.getElementById("root"));
root.render(
  <Pokemonent
    pokemonProvider={RestPokemonProvider}
  />
);
```
## Pokemonent Props

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| pokemonProvider | PokemonProvider | yes | The provider of Pokémon fetching strategy |
| imageHeight | number | | The height of the image. Defaults to `200` |
| imageWidth | number | | The width of the image. Defaults to `200`. The container uses the same dimension |
| imageClassName | string | | Custom class name for the image |
| captionClassName | string | | Custom class name for the figcaption |
| * | HTMLAttributes | | Any other props (such as `title`) are applied to the outer/wrapper `<figure>` |

## PokemonProvider Props

| Property | Params | Promise Response | Description |
|:---|:---|:---:|:---|
| fetchAllPokemons | - | string[] | Callback to fetch all available Pokémons names or ids |
| fetchPokemon | name: string | Pokemon | Callback to fetch details of a single Pokémon by name or id |

## Pokemon props

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| name | string | yes | The name of the Pokémon |
| imageURL | string | | The image URL of the Pokémon |

## License

MIT License - fork, modify and use however you want.
