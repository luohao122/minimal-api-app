export const AuthorResolver = {
  Query: {
    getAuthors() {
      return {
        authors: [{ firstName: "Hao", lastName: "Luong" }],
      };
    },
  },
};