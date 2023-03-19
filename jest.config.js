export default { 
   moduleDirectories: [
      "node_modules"
   ],
   transform: {
      "^.+\\.jsx?$": "./wrapper.js"
   },
   verbose: true,
};