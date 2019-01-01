import secret from './secret';
import express from 'express';
import https from 'https';
import fs from 'fs';
import axios from 'axios';

var sslOptions = {
    key: fs.readFileSync(secret.ssl_key),
    cert: fs.readFileSync(secret.ssl_cert)
}

const app = express();
const port = 8080;


app.get('/public_repos/:username', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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

https.createServer(sslOptions, app).listen(port, () => console.log(`Git Repo List app listening on port ${port}!`));



