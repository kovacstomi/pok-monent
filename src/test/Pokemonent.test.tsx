import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { act } from "react-test-renderer";
import Pokemonent from "../components/pokemonent/Pokemonent";
import {
  BULBASAUR,
  BULBASAUR_PROVIDER,
  ERROR_IMG,
  ERROR_PROVIDER,
  LOADING_IMG
} from "./utils";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders pokeball", async () => {
  act(() => {
    ReactDOM.render(
      <Pokemonent pokemonProvider={BULBASAUR_PROVIDER} />,
      container
    );
  });

  const image = document.querySelector("img");
  const figcaption = document.querySelector("figcaption");

  expect(image?.src).toBe(LOADING_IMG);
  expect(figcaption).toBeNull();
});

it("renders error image", async () => {
  await act(async () => {
    ReactDOM.render(<Pokemonent pokemonProvider={ERROR_PROVIDER} />, container);
  });

  const image = document.querySelector("img");

  expect(image?.src).toBe(ERROR_IMG);
});

it("renders pokemon bulbasaur", async () => {
  await act(async () => {
    ReactDOM.render(
      <Pokemonent pokemonProvider={BULBASAUR_PROVIDER} />,
      container
    );
  });

  const image = document.querySelector("img");
  const figcaption = document.querySelector("figcaption");

  expect(image?.src).toBe(BULBASAUR.imageURL);
  expect(figcaption?.textContent).toBe(BULBASAUR.name);
});
