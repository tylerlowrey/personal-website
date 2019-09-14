import React, {Component} from 'react';
import axios from 'axios';
import Repo from './components/Repo';

class App extends Component
{

    BASE_API_URL = "https://tylerlowrey.com/api";

    MAX_REPOS_TO_LIST = 10;

    state = {
        repos: []
    };

    /**
     * Retrieves the list of public repos for the specified user, requires a valid access token that has permissions
     * to grab the requested information. Returns a promise.
     *
     * @param username - The username to grab public repos from, (https://github.com/USERNAME)
     */
    fetchPublicRepos = (username, opts) => {

        if(opts === "undefined" || opts["show_organization_repos"] === false)
            return axios.get(`${this.BASE_API_URL}/public_repos/${username}`);
        else if (opts["show_organization_repos"] === true)
            return axios.get(`${this.BASE_API_URL}/public_repos/${username}/`);
        else
            throw "No valid options were provided in call to fetchPublicRepos";

    };

    componentDidMount()
    {

        this.fetchPublicRepos("tylerlowrey")
            .then(results => {
                this.setState({
                    repos: results.data.slice(0, this.MAX_REPOS_TO_LIST + 1)
                });
            })
            .catch(error => {
                console.log("ERROR: ", error);
                this.setState({
                    repos: [
                        {
                            name: "Error",
                            id: "-404",
                            description: "There was an error while trying to communicate with the Github API. " +
                            "You can click on the link below to visit my Github.",
                            error: true,
                            html_url: "https://github.com/tylerlowrey"
                        }
                    ]
                })
            });


    }

    render()
    {
        let reposList = this.state.repos.map((repo, index) => {
            return <Repo key={repo.id}
                         url={repo.html_url}
                         description={repo.description}
                         repoName={repo.name}
                         error={repo.error}
                         repoLang={repo.language}
            />
        });

        return (
            <div className="App">
                {reposList}
            </div>
        );
    }
}

export default App;
