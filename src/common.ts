export type AnyArray<T> = T[] | ReadonlyArray<T>;

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends ReadonlyArray<infer U>
  ? U
  : T;
