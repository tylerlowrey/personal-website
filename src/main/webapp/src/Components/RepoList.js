import React, {useEffect, useState} from "react";
import Repo from "./Repo";
import LoadingIndicator from "./LoadingIndicator";
import '../Styles/Components/RepoList.css';
import axios from 'axios';

/**
 * Container for a list of Repos, see {@link Repo}
 *
 * @param reposApiEndpointUrl - The API Url for the server that the Repo information should be grabbed from
 */
const RepoList = ({ reposApiEndpointUrl }) => {

    const MAX_REPOS_TO_DISPLAY = 10;

    const [repos, setRepos] = useState([]);

    //Grab repo data from the server
    useEffect(() => {
        axios.get(reposApiEndpointUrl).then(response => {
            console.log(response);
            setRepos(response.data.slice(0, MAX_REPOS_TO_DISPLAY));
        }).catch(error => {
            console.log(error);
            setRepos([]);
        })
    }, [])

    return(
        <div className="repo-list-container">
            { repos.length > 0 ? repos.map((element, index) => {
                return(
                  <Repo repoData={element} key={index} />
                );
            }) : <LoadingIndicator loadingIconUrl="/images/eclipse-loading-icon.svg"/>}
        </div>
    )

};

export default RepoList;