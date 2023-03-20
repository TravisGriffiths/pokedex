// jest is running from node directly so has the "undefined" values 
// of "jest", "describe" and "it" already in scope, so the no-undef check is silenced
/* eslint-disable no-undef */

import HistoryViewer from '../components/historyViewer';
import React from 'react';
import * as reactRedux from 'react-redux';
import { emptyMockStore } from './mocks';
import { render, screen } from '@testing-library/react'

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

const useSelectorMock = reactRedux.useSelector;
const useDispatchMock = reactRedux.useDispatch;

describe('History View component', () => {

   beforeEach(() => {
         //eslint-disable-next-line @typescript-eslint/no-empty-function
      useDispatchMock.mockImplementation(() => () => {});
   });

  it('Should render notification default message with empty history', () => {
        useSelectorMock.mockImplementation(selector => selector(emptyMockStore));
        render(<HistoryViewer />);
        const viewedPokemonList = screen.queryAllByLabelText('viewed-pokemon');
        screen.getByText("All Viewed Pokemon:");
        expect(viewedPokemonList.length).toBe(0);
  });

});