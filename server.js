require('dotenv').config();
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 5000;
const client_secret = process.env.client_secret;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/authenticate', async function (req, res) {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var response = await fetch(`https://www.strava.com/oauth/token?client_id=41064&client_secret=${client_secret}&code=${req.query.code}&grant_type=authorization_code`, settings);
    var data = await response.json();

    console.log('access_token: ' + data['access_token']);
    console.log('expires_in: ' + data['expires_in']);
    console.log('username: ' + data['athlete']['username']);
    console.log('id: ' + data['athlete']['id']);
    // res.send(data);
    res.set('location', 'http://localhost:3000/home');
    res.status(301).cookie('access_token', 'Bearer ' + data['access_token'], {
        expires: new Date(Date.now() + data['expires_in'] * 100) // cookie deleted when expired
    }).send();
});

app.listen(PORT, () => console.log(`Express JS listening on port ${PORT}`));