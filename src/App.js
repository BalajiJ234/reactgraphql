import { useEffect, useState, useCallback } from "react";

import github from "./db";
import githubQuery from "./Query";

const App = () => {
  let [userName, setUserName] = useState("");

  const fetchData = useCallback(() => {
    fetch(github.baseUrl, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.data.viewer.name);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hey there {userName}</p>
    </div>
  );
};

export default App;
