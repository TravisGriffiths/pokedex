import { 
   createAsyncThunk, 
   createSlice } from "@reduxjs/toolkit";

import { POKEMON_LOOKUP_URL , POKE_GRAPHQL_ENDPOINT } from "./constants";
import { Pokemon, PokeStub, FetchStatus } from './types';
import { RootState } from "./store";
import axios from 'axios';
import cache from "./cache";
import { isError } from "../utils";

interface PokedexSliceState {
   status: FetchStatus;
   pokedex: PokeStub[],
   error: unknown;
   
}

const initialPokedexState: PokedexSliceState = {
   status: 'idle',
   pokedex: [],
   error: null
};

export const fetchAllPokemon = createAsyncThunk('pokedex/fetchAllPokemon', async () => {
   if (cache.get(0)) return cache.get(0); 
   try {
      const response = await axios.post(POKE_GRAPHQL_ENDPOINT, {
         "query": `query samplePokeAPIquery {
            gen3_species: pokemon_v2_pokemonspecies(where: {}, order_by: {id: asc, name: asc}) {
                name
                id
               }
            }
            `,
            "variables": null
         });
      
      const fullPokedex: PokeStub[] | undefined = response?.data?.data?.gen3_species;
      if (!fullPokedex || 
         !fullPokedex?.length || 
         fullPokedex?.length === 0 || 
         response?.data?.errors?.length > 0) {
         const errMsg = response?.data?.errors?.length > 0 ? 
            response.data.errors.map((err: Error) => err.message).join(", ") :
            "malformed pokedex";
         throw new Error(errMsg);
      } else {
         cache.set(0, fullPokedex);
         return fullPokedex;
      }
      
   } catch (err: unknown) {
      // TODO: This needs to go to the logging/monitoring API endpoint
      // using console for now
      if (isError(err)) {
         //eslint-disable-next-line no-console
         console.error(err.message);
         throw err;
      }
   }     
});

export const pokedexSlice = createSlice({
   name: "pokedex",
   initialState: initialPokedexState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(fetchAllPokemon.pending, (state) => {
         state.status = 'loading';
      })
      .addCase(fetchAllPokemon.rejected, (state) => {
         state.status = 'failed';
      })
      .addCase(fetchAllPokemon.fulfilled, (state, action) => {
         state.status = 'succeeded';
         state.pokedex = action.payload;
      });
   }
});

export const fetchPokemon = createAsyncThunk('pokemonView/fetchPokemon', async (id: number) => {
   if (cache.get(id)) return cache.get(id);
   
   try {
      const response = await axios.get(`${POKEMON_LOOKUP_URL}${id}`);
      const {name, base_happiness, capture_rate, is_baby, is_legendary, is_mythical} = response.data;
      const viewedPokemon: Pokemon = {
         id, 
         name, 
         baseHappiness: base_happiness, 
         captureRate: capture_rate, 
         isBaby: is_baby, 
         isLegendary: is_legendary,
         isMythical: is_mythical
      };
      cache.set(id, viewedPokemon);
      return viewedPokemon;
   } catch (err: unknown) {
         // TODO: This needs to go to the logging/monitoring API endpoint
         // using console for now
         if (isError(err)) {
            //eslint-disable-next-line no-console
            console.error(err.message);
            throw err;
         }
      }    
});

interface PokemonViewSliceState {
   status: FetchStatus;
   pokemon: Pokemon | null;
   id: number;
   index: number;
   history: number[];
}

const initialViewingState: PokemonViewSliceState = {
   status: 'idle',
   pokemon: null,
   id: 0, 
   index: -1,
   history: []
};

// When navigating back and forward through the history we are using the cache to source our Pokemon objects
// so we only store a single copy of any pokemon, and we only fetch it once. 
export const pokemonViewerSlice = createSlice({
   name: "pokemonView",
   initialState: initialViewingState,
   reducers: {
      back: (state) => {
         const newIndex = state.index - 1;
         state.index = newIndex;
         state.pokemon = cache.get(state.history[newIndex]);
      },
      forward: (state) => {
         const newIndex = state.index + 1;
         state.index = newIndex;
         state.pokemon = cache.get(state.history[newIndex]);
      },
   },
   extraReducers(builder) {
      builder.addCase(fetchPokemon.pending, (state) => {
         state.status = 'loading';
      })
      .addCase(fetchPokemon.rejected, (state) => {
         state.status = 'failed';
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
         if (action.payload) {
            state.status = 'succeeded';
            state.pokemon = action.payload;
            if (action.payload.id !== state.history[state.history.length - 1]) {
               // multiple selections of the same pokemon don't change the view history
               state.history = [...state.history, action.payload.id];
            }
            // when we add a new pokemon, the history is taken to the front 
            state.index = state.history.length - 1;
         }
      });
   }
});


// Selectors

export const allPokemon = (state: RootState) => state.pokedex.pokedex;
export const fetchStatus = (state: RootState) => state.pokedex.status;
export const viewingPokemon = (state: RootState) => state.pokemonViewer.pokemon;
export const viewingStatus = (state: RootState) => state.pokemonViewer.status;
export const hasPrevious = (state: RootState) => state.pokemonViewer.index > 0;
export const hasNext = (state: RootState) => state.pokemonViewer.index < state.pokemonViewer.history.length - 1;

// Actions

export const previousPokemon = pokemonViewerSlice.actions.back;
export const nextPokemon = pokemonViewerSlice.actions.forward;








