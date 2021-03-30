const githubQuery = {
  query: `
  {
    viewer {
      name
      repositories(first: 15, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          name
          description
          id
        }
      }
    }
  }
    `,
};

export default githubQuery;
