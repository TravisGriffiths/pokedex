import HistoryViewer from "./historyViewer";
import React from "react";
import PokeDex from "./pokedex";
import PokemonViewer from "./pokemonViewer";
import styled from "styled-components";

const PokeSearchContainer = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 2rem;
`;

const PokeSearchLayout: React.FC = () => (
   <PokeSearchContainer>
      <PokeDex />
      <PokemonViewer />
      <HistoryViewer />
   </PokeSearchContainer>
);

export default PokeSearchLayout;
