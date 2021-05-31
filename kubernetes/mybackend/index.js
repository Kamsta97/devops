

const { v4: uuidv4 } = require('uuid');
const express = require('express');
const redis = require('redis');
var { Client} = require('pg');

const app = express();
const appId = uuidv4();
const appPort = 5000;

//REDIS
const redisClient = redis.createClient({
    host: 'myredis-node-port',
    port: 6379,
})

redisClient.on('error', (err) => {
    console.log(err)
})

redisClient.on('connect', () => {
    console.log('connect to redis')
})

//POSTGRES
const pgClient = new Client({
    user: 'myappuser',
    password: 'admin123',
    database: 'myappdb', 
    host: 'mypostgres-node-port',
    port: '5432'
})

console.log('afterConfig')

pgClient.connect(err => {
    console.log('inside connect');
    if (err) {
      console.error('connection error', err.stack)
    } else {
        console.log('connected')

        pgClient.query(`
            CREATE TABLE IF NOT EXISTS cards
            (
                id varchar(255) NOT NULL,
                name varchar(40) NOT NULL,
                surname varchar(40) NOT NULL,
                overall integer NOT NULL,
                rare boolean NOT NULL,
                club varchar(40) NOT NULL,
                nationality varchar(40) NOT NULL
            )
        `)
            .catch( (err) => {
            console.log(err);
        })
    }
})

app.get('/api', (req,res) => {
    res.send(`[${appId}] Hello test`);
})

app.listen(appPort, err => {
    console.log(`App listing on port ${appPort}`);
})