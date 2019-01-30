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

https_app.get('/api/public_repos/:username', (req, res) => {
    axios.get(`https://api.github.com/users/${req.params.username}/repos?type=owner&sort=update&access_token=${secret.api_key}`)
        .then(result => {
            res.json(result.data);
        })
        .catch(error => {
            res.status(500).json({
                error: "Error"
            })
        });
});

https.createServer(sslOptions, https_app).listen(https_port, () => {
    console.log(`Website app listening on port ${https_port}!`);
});

const http_app = express();

//Redirect all traffic to https
http_app.get('*', (req, res) => {
    res.redirect('https://' + req.headers.host + req.url);
});

http.createServer(http_app).listen(http_port, () => {
    console.log("Redirecting all traffic on port 80 to port 443 (https)");
});

