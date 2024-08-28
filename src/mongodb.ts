import type { Document } from "mongodb";
import type { PipelineStage } from "./pipelinestages";

declare module "mongodb" {
  interface Collection {
    aggregate<T extends Document = Document>(
      pipeline?: Array<PipelineStage | { [x: string]: any }>,
      options?: AggregateOptions
    ): AggregationCursor<T>;
  }
}

export * from "./pipelinestages";
export * from "./expression";
