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
6. `npm run build` will first run all testing, then build the project for production


In addition to Vite, this project uses Redux Toolkit in order to satisfy the "latest Redux framework". 
The react version is 18.2 for the same reason.


TODO:
1. Some of the original vite scaffolding, css in particular is left, but has not been removed if it is not affecting the look of the app. 
2. Not all jest tests are written. 
3. I didn't find any collected open source images of all the Pokemon, but having these woudl *greatly* enhance the UX
4. I didn't take the time to grab and use svg icons. This would improve the UI


To deploy into a concurrent environment:
1. File/Folder organization would have to be standardized. This folder setup works as it is a very small app. 
2. Error catching needs to be wired into appropriate logging API so problems can be detected. 
3. An error boundry around this feature might be appropriate. 
4. Some End to End tests should be implemented.
