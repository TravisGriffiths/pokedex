// jest is running from node directly so has the "undefined" values 
// of "jest", "describe" and "it" already in scope, so the no-undef check is silenced
/* eslint-disable no-undef */

import PokemonViewer from '../components/pokemonViewer';
import React from 'react';
import * as reactRedux from 'react-redux';
import { render, screen } from '@testing-library/react'

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

const useSelectorMock = reactRedux.useSelector;
const useDispatchMock = reactRedux.useDispatch;


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

const emptyMockStore = {
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

const loadingMockStore = {
   pokedex: {
      status: 'succeeded',
      pokedex: [],
      error: null
   }, 
   pokemonViewer: {
      status: 'loading',
      pokemon: mockPokemon,
      index: 0,
      history: [1]
   }
};


const loadedMockStore = {
   pokedex: {
      status: 'succeeded',
      pokedex: [],
      error: null
   }, 
   pokemonViewer: {
      status: 'suceeded',
      pokemon: mockPokemon,
      index: 0,
      history: [1]
   }
};

const hasPastMockStore = {
   pokedex: {
      status: 'succeeded',
      pokedex: [],
      error: null
   }, 
   pokemonViewer: {
      status: 'suceeded',
      pokemon: mockPokemon,
      index: 1,
      history: [2, 1]
   }
}

const hasFullHistoryMockStore = {
   pokedex: {
      status: 'succeeded',
      pokedex: [],
      error: null
   }, 
   pokemonViewer: {
      status: 'suceeded',
      pokemon: mockPokemon,
      index: 1,
      history: [3, 2, 1]
   }
}


describe('Pokemon viewer component', () => {

   beforeEach(() => {
       //eslint-disable-next-line @typescript-eslint/no-empty-function
      useDispatchMock.mockImplementation(() => () => {});
  });

   it('Should render a request to search for a pokemon', () => {
         useSelectorMock.mockImplementation(selector => selector(emptyMockStore));
         render(<PokemonViewer />);
         screen.findByText('Please select a Pokemon')
   });

   it('Should render a notice of requests in flight', () => {
      useSelectorMock.mockImplementation(selector => selector(loadingMockStore));
      render(<PokemonViewer />);
      screen.findByText('One moment while we retrive your pokemon')
   });


   it('Should display a loaded Pokemon', () => {
      useSelectorMock.mockImplementation(selector => selector(loadedMockStore));
      render(<PokemonViewer />);
      screen.findByText('first');
      screen.findByText('12%');
      screen.findByText('34%');
      // Verify both buttons are disabled in this state
      const prev = screen.getByLabelText('prev-button');
      const next = screen.getByLabelText('next-button');
      expect(prev.attributes.disabled).not.toBeUndefined();
      expect(next.attributes.disabled).not.toBeUndefined();
   });

   it('Should enable the back button when there is a history', () => {
      useSelectorMock.mockImplementation(selector => selector(hasPastMockStore));
      render(<PokemonViewer />);
      // Verify previous is enabled
      const prev = screen.getByLabelText('prev-button');
      const next = screen.getByLabelText('next-button');
      expect(prev.attributes.disabled).toBeUndefined();
      expect(next.attributes.disabled).not.toBeUndefined();
   
   });

   it('Should enable the both buttons when there is history in both directions', () => {
      useSelectorMock.mockImplementation(selector => selector(hasFullHistoryMockStore));
      render(<PokemonViewer />);
      // Verify both buttons are enabled
      const prev = screen.getByLabelText('prev-button');
      const next = screen.getByLabelText('next-button');
      expect(prev.attributes.disabled).toBeUndefined();
      expect(next.attributes.disabled).toBeUndefined();
   });

});