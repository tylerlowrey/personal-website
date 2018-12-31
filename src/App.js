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
    fetchPublicRepos = (username, api_key) => {
        return axios.get(`https://api.github.com/users/${username}/repos?type=owner&sort=update&access_token=${api_key}`);
    };

    componentDidMount()
    {
        this.fetchPublicRepos("tylerlowrey", "cb8c993a419ffe6a30a36bb2fd04cdd1befce03c")
            .then(results => {
               this.setState({
                   repos: results.data
               });
            });
    }

    render()
    {
        let reposList = this.state.repos.map( (repo, index) => {
            return <Repo key={repo.id} url={repo.html_url} description={repo.description} repoName={repo.name} />
        });

        return (
            <div className="App">
                {reposList}
            </div>
        );
    }
}

export default App;
