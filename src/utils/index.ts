const pickRandomPokemon = (total: number = 1) =>
  Math.floor(Math.random() * total);

const classNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export { pickRandomPokemon, classNames };
