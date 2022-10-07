import { StoreShape } from 'main/store';

export type StoreOptionKeys = keyof StoreShape;
export type StoreOptionValues = StoreShape[StoreOptionKeys];

export type Selector = (state: StoreShape) => StoreOptionValues;
