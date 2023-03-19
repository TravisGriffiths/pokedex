// jest is running from node directly so has the "undefined" values 
// of "jest", "describe" and "it" already in scope, so the no-undef check is silenced
/* eslint-disable no-undef*/
import { configureStore } from 'redux';

//import rootReducer from '../reducers';


jest.mock('redux');

describe('Store', () => {
  it('should call configureStore with rootReducer', () => {
   //  const store = createStore(rootReducer);
    expect(configureStore).toHaveBeenCalledWith(() => true);
  });
});