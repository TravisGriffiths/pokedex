# pokedex

Pokedex Viewer

This project was built with [Vite](https://vitejs.dev/) as this is one of several technologies that have 
largely surplanted 'Create React App' for multiple reasons performance being the primary. In order to 
load and run this:

1. `git clone` the repository
2. `cd` into the new directory
3. `npm install` to get the required packages
4. `npm run dev` will run the dev server if desired. 
5. `npm run test` will run the linter and all jest tests
6. `npm run build` will lint and compile all files, placing the results in the `dist` folder
7. `npm run preview` runs a local server on the compiled files in `dist`


In addition to Vite, this project uses Redux Toolkit in order to satisfy the "latest Redux framework". 
The react version is 18.2 for the same reason.

## Usage

When starting up the app will make an immediate fetch to the Pokemon API GraphQL endpoint to get the *full* list of all Pokemon
by `name` and `id` *only*. This is a list of 1008 pokemon and loads quite quickly. At this point an input box appears on the left asking you to enter the name of a pokemon. The full list will filter by whatever string you enter giving you a list of the
results. Each of these items is *clickable* and will trigger a query to load the full pokemon from the API. The information displayed is quite basic, but does include the *Color* of the pokemon, which will style the underline of the name.

Every time a query goes to the API, the retrieved pokemon is placed in a cache. If the user wants to return to view that pokemon it will render from the cache *not* from the API. That is every endpoint of the API will only be queried *once*. This is possible as the values are fairly set and unlikely to change so repeat queries are wasteful. 

Every query goes in a list of viewed pokemon. There are 'Previous' and 'Next' buttons that allow a user to peruse back and forth along this list. All of these pokemon are served out of the cache so the response should be very quick. Choosing the same pokemon multiple times consecutively from the master list is treated like a no-op, the user is already viewing that pokemon. However, if a user decides to load the same pokemon many times non-consecutively, the history queue will load those happily. These will come from cache after the first load, so will be served rapidly. This only add a single integer to the queue every time to the queue and the cache itself has no repeats, so if a user decides to do this, the resource cost is extremely minimal. 

Last, on the right there is the history view, which lists all of the pokemon in the history queue. The current displayed pokemon is highlighted in blue. By clicking on any of these pokemon the viewer will snap back to that point in the queue. 

## Business Requirements
- [x] Use the Pokemon API to make API requests for data https://pokeapi.co/docs/v2. _Both REST and GraphQL endpoints are used_.
- [x] Able to search for any Pokemon. _Full list of all pokemon is loaded immediately, all subsequent calls fetch specifcs_
- [x] Able to see a history of what has been searched and revisit at anytime. _Using either the nav buttons or the History queue all viewed pokemon are visible and can be brought back to the main viewer quickly from the cache_

## Technical Requirements
- [x] May use scaffolding. _Used [Vite](https://vitejs.dev/) have been very impressed_
- [x] Latest Redux Framework. _Used the recommended [Redux Toolkit](https://redux-toolkit.js.org/)_
- [x] Done in Typescript. _Apart from the jest tests, this is all Typescript_
- [x] Version control. _Fully in [Git](https://github.com/TravisGriffiths/pokedex)_
- [x] SCSS or Styled Components. _Used Styled Components throughout_
- [x] Has a README. _This Document_

## Bonus Points
- [ ] Able to see details about abilities, moves, species, sprites, and types upon searching. _Spent a large amount of time wrestling Jest configuration to the ground, while it is tempting and easy at this stage, have not implemented this. 
- [ ] Able to see other evolutions of Pokemon and be able to navigate to specific Pokemon in the evolution chain. _Same as above_
- [x] Sleak and intuitive style that resembles a Pokedex. _Confession: I have *no* idea what a Pokedex looks like, but I think the functionality implemented is quite intuitive_. 
- [x] Automated test to ensure the business logic is correct. _These are included, but could have more_

TODO:
1. Some of the original vite scaffolding, css in particular is left, but has not been removed if it is not affecting the look of the app. 
2. Not all jest tests are written. 
3. I didn't find any collected open source images of all the Pokemon, but having these woudl *greatly* enhance the UX
4. I didn't take the time to grab and use svg icons. This would improve the UI
5. Use a more modern package manager than npm, in this case it was a deliberate choice as the presese of npm on a testing machine is almost ubiqutous. 


To deploy into a concurrent environment:
1. File/Folder organization would have to be standardized. This folder setup works as it is a very small app.
2. Error catching needs to be wired into appropriate logging API so problems can be detected centrally. 
3. An error boundry around this feature might be appropriate. 
4. Some End to End tests should be implemented.
