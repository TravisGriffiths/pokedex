import { Color } from "./types";

export const POKE_GRAPHQL_ENDPOINT = 'https://beta.pokeapi.co/graphql/v1beta';

export const POKEMON_LOOKUP_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

/*
   Colors from: https://pokeapi.co/api/v2/pokemon-color/
*/

export const palette: Record<Color, string> = {
   black: '#212121',
   blue: '#4592C4',
   brown: '#A38C21',
   gray: '#414141',
   green: '#729F3F',
   pink: '#FDB9E9',
   purple: '#7B62A3' ,
   red: '#E3350D',
   white: '#FFF',
   yellow: '#EED535',
};
