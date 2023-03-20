
const mockPokemon = {
   id: 1,
   name: 'first',
   isBaby: false,
   isLegendary: false,
   isMythical: true,
   baseHappiness: 12,
   captureRate: 34,
   color: 'yellow'
}

export const mockPokemonList = [{
   id: 1,
   name: 'first',
   },
   {
      id: 2,
      name: 'second'
   },
   {
      id: 3,
      name: 'third'
   }
];

export const emptyMockStore = {
   pokedex: {
      status: 'idle',
      pokedex: [],
      error: null
   }, 
   pokemonViewer: {
      status: 'idle',
      pokemon: null,
      index: -1,
      history: []
   }
};

export const loadedMockStore = {
   pokedex: {
      status: 'succeeded',
      pokedex: mockPokemonList,
      error: null
   },
   pokemonViewer: {
      status: 'suceeded',
      pokemon: mockPokemon,
      index: 0,
      history: [1]
   }
};


export const loadingMockStore = {
   pokedex: {
      status: 'succeeded',
      pokedex: mockPokemonList,
      error: null
   }, 
   pokemonViewer: {
      status: 'loading',
      pokemon: mockPokemon,
      index: 0,
      history: [1]
   }
};

export const hasPastMockStore = {
   pokedex: {
      status: 'succeeded',
      pokedex: mockPokemonList,
      error: null
   }, 
   pokemonViewer: {
      status: 'suceeded',
      pokemon: mockPokemon,
      index: 1,
      history: [2, 1]
   }
}

export const hasFullHistoryMockStore = {
   pokedex: {
      status: 'succeeded',
      pokedex: mockPokemonList,
      error: null
   }, 
   pokemonViewer: {
      status: 'suceeded',
      pokemon: mockPokemon,
      index: 1,
      history: [3, 2, 1]
   }
}
