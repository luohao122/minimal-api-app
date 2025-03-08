import { buildSchema } from "graphql";

export const authorSchema = buildSchema(`#graphql
  type Author {
    firstName: String
    lastName: String
  }

  type AuthorResult {
    authors: [Author]!
  }

  type Query {
    getAuthors: AuthorResult
  }
`);