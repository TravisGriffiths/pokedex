import{ fetchPokemon , fetchAllPokemon, pokemonViewerSlice} from './slices';
import { store } from "../state/store";


// These could *mostly* be defined directly in slices, but the async actions use store,
// and store needs the slices to configure so a circular dependency gets created. 

export const fetchPokemonById = (id: number) => store.dispatch(fetchPokemon(id));
export const fetchAllPokeStubs = () => store.dispatch(fetchAllPokemon());
export const previousPokemon = pokemonViewerSlice.actions.back;
export const nextPokemon = pokemonViewerSlice.actions.forward;
export const setCurrentIndex = (index: number) => pokemonViewerSlice.actions.setIndex(index);






