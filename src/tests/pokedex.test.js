// jest is running from node directly so has the "undefined" values 
// of "jest", "describe" and "it" already in scope, so the no-undef check is silenced
/* eslint-disable no-undef */

import renderer from 'react-test-renderer';
import PokeDex from '../components/pokedex';
import React from 'react';
import * as reactRedux from 'react-redux';
import { allPokemon } from '../state/slices';
import { render, screen } from '@testing-library/react'

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

const useSelectorMock = reactRedux.useSelector;
const useDispatchMock = reactRedux.useDispatch;


const mockPokemonList = [{
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

const emptyMockStore = {
   pokedex: {
      status: 'idle',
      pokedex: [],
      error: null
   }, 
   pokemonView: {
      status: 'idle',
      pokemon: null,
      id: 0, 
      index: -1,
      history: []
   }
};

const loadedMockStore = {
   pokedex: {
      status: 'succeeded',
      pokedex: mockPokemonList,
      error: null
   },
   pokemonView: {
      status: 'idle',
      pokemon: null,
      id: 0, 
      index: -1,
      history: []
   }
};


describe('Pokedex component', () => {

   beforeEach(() => {
      useDispatchMock.mockImplementation(() => () => {});
      
  });

  it('Should render notification message as the master list is loaded', () => {
      useSelectorMock.mockImplementation(selector => selector(emptyMockStore));
      render(<PokeDex />);
      screen.getByText("Retrivieng Pokedex....");
  });

  it('Should wait for imput ', () => {
   useSelectorMock.mockImplementation(selector => selector(loadedMockStore));
   console.dir(loadedMockStore);
   render(<PokeDex />);
   screen.getByText("Enter any pokemon name");
});
});