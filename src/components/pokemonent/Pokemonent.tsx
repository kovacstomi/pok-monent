import React from "react";
import { HTMLAttributes, useCallback } from "react";
import usePokemonQuery from "../../hooks/usePokemonQuery";
import { PokemonProvider } from "../../pokemon_providers/pokemonProvider";
import { classNames, pickRandomPokemon } from "../../utils";
import errorImage from "./error.webp";
import styles from "./Pokemonent.module.css";
import pokemonNotFound from "./pokemon_not_found.webp";
import pokeBall from "./poke_ball.png";

type PokemonentProps = HTMLAttributes<HTMLElement> & {
  pokemonProvider: PokemonProvider;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
  captionClassName?: string;
};

const Pokemonent = ({
  pokemonProvider,
  imageHeight = 200,
  imageWidth = 200,
  imageClassName,
  captionClassName,
  className,
  style,
  ...figureProps
}: PokemonentProps) => {
  const fetchAllPokemons = useCallback(
    () => pokemonProvider.fetchAllPokemons(),
    [pokemonProvider]
  );

  const { data: allPokemons, error: fetchAllPokemonsError } = usePokemonQuery({
    callbackFn: fetchAllPokemons,
  });

  const fetchPokemon = useCallback(() => {
    const pokemonIndex = pickRandomPokemon(allPokemons?.length);
    return pokemonProvider.fetchPokemon(allPokemons![pokemonIndex]);
  }, [allPokemons, pokemonProvider]);

  const {
    data: pokemon,
    error: pokemonError,
    isLoading: isLoadingPokemon,
    isIdle: isPokemonIdle,
  } = usePokemonQuery({
    callbackFn: fetchPokemon,
    enabled: !!allPokemons,
  });

  let src = "";
  let alt = "";
  let pokemonImageClassName = "";
  let caption = "";

  if (pokemonError || fetchAllPokemonsError) {
    alt = `Pokemon fetch error`;
    src = errorImage;
    pokemonImageClassName = styles.image;
    caption = "Could not load Pokémon";
  } else if (isLoadingPokemon || isPokemonIdle || !pokemon) {
    alt = `Spinning Pokémon ball`;
    src = pokeBall;
    pokemonImageClassName = styles.pokeBall;
  } else {
    alt = `Pokémon ${pokemon.name}`;
    src = pokemon.imageURL || pokemonNotFound;
    pokemonImageClassName = styles.image;
    caption = pokemon.name;
  }

  return (
    <figure
      style={{ width: imageWidth, ...style }}
      className={classNames(styles.figure, className)}
      {...figureProps}
    >
      <img
        width={imageWidth}
        height={imageHeight}
        className={classNames(pokemonImageClassName, imageClassName)}
        alt={alt}
        src={src}
      />
      {caption && (
        <figcaption className={classNames(styles.title, captionClassName)}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default Pokemonent;
