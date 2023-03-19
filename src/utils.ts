import { PokeStub } from "./state/types";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
export const isError = (e: any): e is Error => 'message' in e;

// Much easier to test as pure function pulled out here
export const filterPokemonByName = (filterStr: string, pokedex: PokeStub[]): PokeStub[] => 
   pokedex.filter((pokestub: PokeStub) => pokestub.name.match(filterStr));
