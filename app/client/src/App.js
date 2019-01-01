import React, {Component} from 'react';
import axios from 'axios';
import Repo from './components/Repo';

class App extends Component
{

    state = {
        repos: []
    };

    /**
     * Retrieves the list of public repos for the specified user, requires a valid access token that has permissions
     * to grab the requested information. Returns a promise.
     *
     * @param username - The username, (https://github.com/USERNAME)
     * @param api_key - The api key obtained from Github
     */
    fetchPublicRepos = () => {
        return axios.get(`https://team283.org:8080/public_repos/tylerlowrey`);
    };

    componentDidMount()
    {
        this.fetchPublicRepos()
            .then(results => {
                this.setState({
                    repos: results.data
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
