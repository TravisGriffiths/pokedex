import { Color, Pokemon } from "../state/types";
import React from "react";
import cache from "../state/cache";
import styled from "styled-components";
import { currentPokeIndex ,fullHistory } from "../state/slices";
import { palette } from "../state/constants";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIndex } from "../state/actions";


const HistoryContainer = styled.div`
   flex: 1;
`

const HistoryTitle = styled.div`
   font-size: 18px;
   font-weight: bold;
`;

const ViewedPokemon = styled.div<{index: number, current: number, color: string }>`
   font-size: 14px;
   cursor: pointer;
   &:hover {
      background-color: #888;
   }
   &:first-letter {
      text-transform: uppercase;
   }
   ${({index, current}) => index === current ? 'background-color: #9696df;' : '' }
   ${
      ({color}) => `text-decoration: underline ${palette[color as Color]};
                    text-decoration-thickness: 2px;` 
   }
`

const HistoryViewer: React.FC = () => {
   const dispatch = useDispatch();
   const history = useSelector(fullHistory);
   const currentIdx = useSelector(currentPokeIndex);
   
   return (   
   <HistoryContainer>
      <HistoryTitle>All Viewed Pokemon:</HistoryTitle>
      { history.map((id: number, idx) => {
         const p: Pokemon = cache.get(id);
         return (<ViewedPokemon 
            key={idx} 
            index={idx} 
            current={currentIdx} 
            onClick={() => dispatch(setCurrentIndex(idx))}
            color={p.color}>{p.name}</ViewedPokemon >)
      })}
   </HistoryContainer>)

};

export default HistoryViewer;
