import { FetchStatus, PokeStub } from "../state/types";
import React, { useState, ReactNode, ChangeEvent } from "react";
import { allPokemon, fetchStatus } from "../state/slices";

import { fetchPokemonById } from '../state/actions';
import { filterPokemonByName } from "../utils";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SearchContainer = styled.div`
   flex: 1;
`;

const PokeSearch = styled.input`
   background-color: white;
   font-size: 24px;
   color: #333;
   border-radius: 3px;
   margin-top: 10px;
`;

const PokemonNameList = styled.ul`
   list-style: none;
   overflow-y: scroll;
   max-height: 800px;
   text-align: left;
   &::-webkit-scrollbar {
      display: none;
   }
   -ms-overflow-style: none;  
   scrollbar-width: none;  
`;

const PokemonListItem = styled.li`
   height: 2rem;
   cursor: pointer;
   &:hover {
      background-color: #888;
   }
   &:first-letter {
      text-transform: uppercase;
   }
   border
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
         <PokeSearch type="text" onChange={filterOnName} placeholder="Enter any pokemon name"/>
         <PokemonNameList>
            { pokeList.map((pm: PokeStub) => 
               <PokemonListItem key={pm.id} onClick={() => fetchPokemonById(pm.id)}>
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

