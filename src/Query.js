const githubQuery = {
  query: `
  {
    viewer {
      name
    }
    search(query: "user:BalajiJ234 sort:updated-desc", type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          name
          description
          id
          url
        }
      }
    }
  }
  
    `,
};

export default githubQuery;
