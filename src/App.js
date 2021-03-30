import { useEffect, useState, useCallback } from "react";

import github from "./db";
import query from "./Query";
import RepoInfo from "./RepoInfo";
import SearchBox from "./SearchBox";

const App = () => {
  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setQueryString] = useState("");
  let [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(query(pageCount, queryString));
    fetch(github.baseUrl, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((res) => res.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const count = data.data.search.repositoryCount;
        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageCount, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hey there {userName}</p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={(myString) => {
          setQueryString(myString);
        }}
        onTotalChange={(myNumber) => {
          setPageCount(myNumber);
        }}
      />
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <RepoInfo key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
