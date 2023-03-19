import { AttributeType, Pokemon  } from "../state/types";
import React from "react";
import styled from "styled-components";

import { palette } from "../state/constants";
import { store } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { hasNext, hasPrevious, viewingPokemon, viewingStatus, previousPokemon, nextPokemon } from "../state/slices";


const PokeViewerContainer = styled.div`
   flex: 4;
   border: 1px black solid;
`;


const AttributeName = styled.span`
   font-weight: bold;
   margin-right: 1rem;
`;

const AttributeEntry = styled.div`
   display: block;
   font-size: 24px;
   margin-left: 2rem;
`;

const PokemonName = styled.div`
   font-size: 32px;
   font-weight: bold;
   margin-left: 3rem;
   text-decoration: underline ${palette.red};
   &:first-letter {
      text-transform: uppercase;
   }
`;

const NavigatorContainer = styled.div`
   diplay: flex;
   margin: 2em;
`;

const NavigationButton = styled.button`
   margin: 1rem;
   &:disabled {
      cursor: not-allowed;
      color: #888;
      opacity: 0.5;
   }
`;

interface StringValueProps {
   value: string;
}

const StringValue: React.FC<StringValueProps> = ({ value }) => 
   <span>{value}</span>;

interface NumberValueProps {
   value: number;
}

const NumberValue: React.FC<NumberValueProps> = ({ value }) =>
   <span>{value}%</span>;

interface BooleanValueProps {
   value: boolean;
} 

const BooleanValue: React.FC<BooleanValueProps> = ({ value }) =>
   <span>{ value ? "Yes" : "No" }</span>;


interface AttributeProps {
   name: string;
   value: number | string | boolean;
}

const Attribute: React.FC<AttributeProps> = ({ name, value }) => {
   return (
      <AttributeEntry>
         <AttributeName>{name}</AttributeName>
         {
            {
               'string': <StringValue value={value as string} />,
               'number': <NumberValue value={value as number} />,
               'boolean': <BooleanValue value={value as boolean} />
            }[typeof value as AttributeType]
         }
      </AttributeEntry>
   );
};

const HistoryNavigator: React.FC = () => {
   const dispatch = useDispatch();
   const previousActive = useSelector(hasPrevious);
   const nextActive = useSelector(hasNext);

   return (
      <NavigatorContainer>
         <NavigationButton disabled={!previousActive} onClick={() => dispatch(previousPokemon())}>
            View Previous
         </NavigationButton>
         <NavigationButton disabled={!nextActive} onClick={() => dispatch(nextPokemon())}>
            View Next
         </NavigationButton>
      </NavigatorContainer>
   );
};

const PokemonViewer: React.FC= () => {

   const pokemon = useSelector(viewingPokemon);
   const fetchStatus = useSelector(viewingStatus);


   
   return pokemon ? (
      <PokeViewerContainer >
      <PokemonName>{pokemon.name}</PokemonName>
      <Attribute name="Base Happines" value={pokemon.baseHappiness} />
      <Attribute name="Capture Rate" value={pokemon.captureRate} />
      <Attribute name="Baby?" value={pokemon.isBaby} />
      <Attribute name="Legendary?" value={pokemon.isLegendary} />
      <Attribute name="Mythical?" value={pokemon.isMythical} />
      <HistoryNavigator />

   </PokeViewerContainer >
   ) : (
      <PokeViewerContainer>
         <h2>Please select a Pokemon</h2>
      </PokeViewerContainer> 
     
   );
};




export default PokemonViewer;
