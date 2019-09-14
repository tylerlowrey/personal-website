import secret from './secret';
import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import axios from 'axios';

var sslOptions = {
    key: fs.readFileSync(secret.ssl_key),
    cert: fs.readFileSync(secret.ssl_cert)
}

const https_app = express();
const http_port = 80;
const https_port = 443;


https_app.use(express.static(__dirname + '/../../client/build'));

/**
 * Grabs all public repositories of the specified user. These repositories are returned in descending order where the
 * first item in the collection is the most recently updated repository
 *
 * If provided a GET parameter of show_organization_repos that is true, will also return public repositories of
 * organizations that the user is an admin of
 */
https_app.get('/api/public_repos', (req, res) => {

    let repoData;

    try
    {
        repoData = grabPublicRepos("tylerlowrey");

        if(req.query.show_organization_repos === "true")
        {
            let organizationRepos = grabPublicOrganizationRepos("tylerlowrey");
            Array.prototype.push.apply(repoData, organizationRepos);
        }

        sortReposByDate(repoData);

        res.json(repoData);

    }
    catch (error)
    {
        res.status(500).json({
            error: error
        })
    }

});

/**
 * Grabs all of the public Github repositories of the specified user
 *
 * @param username - The Github username of the user whose public repository data is being grabbed
 * @returns Array - an array of objects where each object represents a separate repository and its associated data
 */
function grabPublicRepos(username)
{
    let retrievedData;
    axios.get(`https://api.github.com/users/${username}/repos?type=owner&sort=update&access_token=${secret.api_key}`)
        .then(result => {
            retrievedData = result.data;
        })
        .catch(error => {
            throw error;
        });

    return retrievedData;
}


/**
 * Grabs all of the public repositories of the organizations where the given user is an admin
 *
 * @param username - The Github username of the user whose public organizational repository data is being grabbed
 * @returns Array - an array of objects where each object represents a separate repository and its associated data
 */
function grabPublicOrganizationRepos(username)
{
    let orgsUserIsMemberOf;
    let retrievedData;

    axios.get(`https://api.github.com/user/memberships/orgs?access_token=${secret.api_key}`)
        .then( result => {
            //
        })
        .catch( error => {
            throw error;
        });

    axios.get(`https://api.github.com/users/${username}/repos?type=owner&sort=update&access_token=${secret.api_key}`)
        .then(result => {
            retrievedData = result.data;
        })
        .catch(error => {
            throw error;
        });

    return retrievedData;
}

/**
 * Sorts repos by date in descending order, where the most recently updated repo is at the first index
 *
 * @param repos - an Array of repository objects that is to be sorted based upon the last updated data
 * @return Array - The same Array that was given as a parameter, with the repositories sorted
 */
function sortReposByDate(repos)
{

}


https.createServer(sslOptions, https_app).listen(https_port, () => {
    console.log(`Personal website application (HTTPS) listening on port ${https_port}`);
});

const http_app = express();

//Redirect all traffic to https
http_app.get('*', (req, res) => {
    res.redirect('https://' + req.headers.host + req.url);
});

http.createServer(http_app).listen(http_port, () => {
    console.log("Redirecting all traffic on port 80 (http) to port 443 (https)");
});

