type TFixedArrayImpl<TArray extends (TSubType)[], TSubType extends unknown, TSize extends number> =
    TArray['length'] extends TSize ? TArray : TFixedArrayImpl<[...TArray, TSubType], TSubType, TSize>;

export type TFixedArray<TSubType extends unknown, TSize extends number> = TFixedArrayImpl<[], TSubType, TSize>
