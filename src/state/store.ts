import { configureStore } from '@reduxjs/toolkit';
import{ pokedexSlice, pokemonViewerSlice} from './slices';

export const store = configureStore({
  reducer: {
    pokedex: pokedexSlice.reducer,
    pokemonViewer: pokemonViewerSlice.reducer
  },
});


export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch