import React from "react";
import styled from "styled-components";
import PokeDex from "./pokedex";
import PokemonViewer from "./pokemonViewer";


const PokeSearchContainer = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 2rem;

`;


const PokeSearchLayout: React.FC = () => (
   <PokeSearchContainer>
      <PokeDex />
      <PokemonViewer />
   </PokeSearchContainer>
);

export default PokeSearchLayout;
