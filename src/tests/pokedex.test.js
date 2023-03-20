// jest is running from node directly so has the "undefined" values 
// of "jest", "describe" and "it" already in scope, so the no-undef check is silenced
/* eslint-disable no-undef */

import PokeDex from '../components/pokedex';
import React from 'react';
import * as reactRedux from 'react-redux';
import { emptyMockStore, loadedMockStore } from './mocks';
import { fireEvent, render, screen } from '@testing-library/react'

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

const useSelectorMock = reactRedux.useSelector;
const useDispatchMock = reactRedux.useDispatch;

describe('Pokedex component', () => {

   beforeEach(() => {
       //eslint-disable-next-line @typescript-eslint/no-empty-function
      useDispatchMock.mockImplementation(() => () => {});
  });

   it('Should render notification message as the master list is loaded', () => {
         useSelectorMock.mockImplementation(selector => selector(emptyMockStore));
         render(<PokeDex />);
         screen.getByText("Retrivieng Pokedex....");
   });

   it('Should wait for imput ', () => {
      useSelectorMock.mockImplementation(selector => selector(loadedMockStore));
      const {container} = render(<PokeDex />);
      const input = container.querySelector('input');
      expect(input.attributes.placeholder.value).toEqual("Enter any pokemon name");
   });

   it('Should filter results', () => {
      useSelectorMock.mockImplementation(selector => selector(loadedMockStore));
      render(<PokeDex />);
      const inputEl = screen.getByLabelText("search-input");
      fireEvent.change(inputEl, {target: {value: 'd'}});
      // With a 'd' we should have both 'second' and 'third'
      screen.getByText('second');
      screen.getByText('third');
      // 'first' should be absent
      expect(screen.queryByText('first')).toBeNull();
   });
});