export interface Pokemon {
   id: number;
   name: string;
   isBaby: boolean;
   isLegendary: boolean;
   isMythical: boolean;
   baseHappiness: number;
   captureRate: number;
}

export type PokeStub = Pick<Pokemon, 'id' |'name'>;

export type FetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AttributeType = 'string' | 'number' | 'boolean';