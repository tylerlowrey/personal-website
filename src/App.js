import React, {Component} from 'react';
import axios from 'axios';
import Repo from './components/Repo';

class App extends Component
{

    state = {
        repos: []
    };

    fetchPublicRepos = () => {

    };

    componentDidMount()
    {
        axios.get("https://api.github.com/users/tylerlowrey/repos?type=owner&sort=update&access_token=cb8c993a419ffe6a30a36bb2fd04cdd1befce03c")
            .then( response => {
                this.setState({
                   repos: response.data
                });
            })
            .catch(error => {
                console.log("BAD", error);
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
