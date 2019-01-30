import React, {Component} from 'react';
import axios from 'axios';
import Repo from './components/Repo';

class App extends Component
{

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
    fetchPublicRepos = (username) => {
        return axios.get(`https://tylerlowrey.com/api/public_repos/${username}`);
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
                console.log("BAD", error);
                this.setState({
                    repos: [
                        {
                            name: "Error",
                            id: "-404",
                            description: "There was an error communicating with the Github API. " +
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
