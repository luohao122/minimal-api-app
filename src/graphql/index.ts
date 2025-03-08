import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { authorSchema } from "./schema/author";

const mergedSchema = mergeTypeDefs([authorSchema]);

export const schema = makeExecutableSchema({
  typeDefs: mergedSchema,
  resolvers,
});
