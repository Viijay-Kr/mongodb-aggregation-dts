import { Binary } from "mongodb";
import type { AnyArray, Unpacked } from "./common";

type QuerySelector<T> = {
  // Comparison
  $eq?: T;
  $gt?: T;
  $gte?: T;
  $in?: [T] extends AnyArray<any> ? Unpacked<T>[] : T[];
  $lt?: T;
  $lte?: T;
  $ne?: T;
  $nin?: [T] extends AnyArray<any> ? Unpacked<T>[] : T[];
  // Logical
  $not?: T extends string ? QuerySelector<T> | RegExp : QuerySelector<T>;
  // Element
  /**
   * When `true`, `$exists` matches the documents that contain the field,
   * including documents where the field value is null.
   */
  $exists?: boolean;
  $type?: string | number;
  // Evaluation
  $expr?: any;
  $jsonSchema?: any;
  $mod?: T extends number ? [number, number] : never;
  $regex?: T extends string ? RegExp | string : never;
  $options?: T extends string ? string : never;
  // Geospatial
  // TODO: define better types for geo queries
  $geoIntersects?: { $geometry: object };
  $geoWithin?: object;
  $near?: object;
  $nearSphere?: object;
  $maxDistance?: number;
  // Array
  // TODO: define better types for $all and $elemMatch
  $all?: T extends AnyArray<any> ? any[] : never;
  $elemMatch?: T extends AnyArray<any> ? object : never;
  $size?: T extends AnyArray<any> ? number : never;
  // Bitwise
  $bitsAllClear?: number | Binary | number[];
  $bitsAllSet?: number | Binary | number[];
  $bitsAnyClear?: number | Binary | number[];
  $bitsAnySet?: number | Binary | number[];
};

export type Condition<T> = T | QuerySelector<T | any> | any;

export type FilterQuery<T> = {
  [P in keyof T]?: Condition<T[P]>;
} & RootQuerySelector<T>;

export type RootQuerySelector<T> = {
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/and/#op._S_and */
  $and?: Array<FilterQuery<T>>;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/nor/#op._S_nor */
  $nor?: Array<FilterQuery<T>>;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/or/#op._S_or */
  $or?: Array<FilterQuery<T>>;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/text */
  $text?: {
    $search: string;
    $language?: string;
    $caseSensitive?: boolean;
    $diacriticSensitive?: boolean;
  };
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/where/#op._S_where */
  $where?: string | Function;
  /** @see https://www.mongodb.com/docs/manual/reference/operator/query/comment/#op._S_comment */
  $comment?: string;
  // we could not find a proper TypeScript generic to support nested queries e.g. 'user.friends.name'
  // this will mark all unrecognized properties as any (including nested queries)
  [key: string]: any;
};
