import { StoreShape as Inferred } from 'main/store';

export type StoreShape = Inferred;
export type StoreOptionKeys = keyof StoreShape;
export type StoreOptionValues = StoreShape[StoreOptionKeys];

export type Selector = (state: StoreShape) => StoreOptionValues;
