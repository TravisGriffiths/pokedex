import React, { useState, ReactNode, ChangeEvent } from "react";

import styled from "styled-components";
import {allPokemon,  fetchStatus, fetchPokemon } from "../state/slices";
import { useSelector } from "react-redux";
import { FetchStatus, PokeStub } from "../state/types";
import { filterPokemonByName } from "../utils";
import { store } from "../state/store";

const SearchContainer = styled.div`
   flex: 1;
   border: 1px solid green;
`;

const PokeSearch = styled.input`
   background-color: white;
   font-size: 24px;
   color: #333;
   border-radius: 3px;

`;

const PokemonNameList = styled.ul`
   list-style: none;
   overflow-y: scroll;
   max-height: 600px;
   text-align: left;
`;

const PokemonListItem = styled.li`
   height: 2rem;
   cursor: pointer;
   &:hover {
      background-color: #888;
   }
`;

const FetchFailureNotification: React.FC = () => 
      <h3>Something went wrong retrieving the Pokedex!</h3>;

const FetchingPokedex: React.FC = () => 
   <h3>Retrivieng Pokedex....</h3>;

const SearchPokedex: React.FC = () => {
   const [pokeList, setPokeList] = useState<PokeStub[]>([]);
   const fullList = useSelector(allPokemon);
   const filterOnName = (e: ChangeEvent<HTMLInputElement>) => {
      setPokeList(filterPokemonByName(e.target.value, fullList));
   };

   return (
      <>
         <PokeSearch type="text" onChange={filterOnName} placeholder="Enter Pokemon Name"/>
         <PokemonNameList>
            { pokeList.map((pm: PokeStub) => 
               <PokemonListItem key={pm.id} onClick={() => store.dispatch(fetchPokemon(pm.id))}>
                  {pm.name}
               </PokemonListItem>)}
         </PokemonNameList>
      </>
   );
};
   
const StatusResolver: Record<FetchStatus, ReactNode> = {
   'idle': <FetchingPokedex />,
   'loading': <FetchingPokedex />,
   'failed': <FetchFailureNotification />,
   'succeeded': <SearchPokedex />
};

const PokeDex: React.FC = () => {
 
   const status = useSelector(fetchStatus);

   return (
      <SearchContainer>
         { StatusResolver[status] }
      </SearchContainer>
   );
};

export default PokeDex;

