import React from 'react';
import './App.css';
import RepoList from "./Components/RepoList";
import {REPO_SERVICE_API_URL} from "./constants";

function App() {
  return (
    <RepoList reposApiEndpointUrl={REPO_SERVICE_API_URL + "/repos"}/>
  );
}

export default App;
