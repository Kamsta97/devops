const express =require("express");
const cors = require('cors')
var bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors());
app.use(express.json());
var jsonParser = bodyParser.json()

//REDIS
const redis = require('redis');
const redisClient = redis.createClient({
    host: 'myredis',
    port: 6379,
   //retry_strategy: () => 1000
})
redisClient.on('error', (err) => {
    console.log(err)
})
redisClient.on('connect', () => {
    console.log('connect to redis')
})

//POSTGRES
var { Client} = require('pg');
const pgClient = new Client({
    user: 'postgres',
    password: 'admin123',
    database: 'mytestdb',
    host: 'mypostgres', //nazwa kontenera
    port: '5432'
})

pgClient.connect(err => {
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

//METHODS
app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/createCard",jsonParser, (req,res) => {
    let query = `INSERT INTO cards (id,name,surname,overall,rare,club,nationality) VALUES (
        '${uuidv4()}',
        '${req.body.name}',
        '${req.body.surname}',
        ${parseInt(req.body.overall)},
        ${StringToBool(req.body.rare)},
        '${req.body.club}',
        '${req.body.nationality}')`
    pgClient.query(query)
    .then( () => {
        console.log(`${req.body.name} ${req.body.surname} has been added to database`);
        res.sendStatus(200);
    })
    .catch( (err) => {
        console.log(err);
    })
})

app.get("/getCardById/:name/:surname",cors(), (req,res) => {
    var name = req.params.name;
    var surname = req.params.surname;
    redisClient.get(name+surname, async (err , data) => {
        console.log(data);
        if (data != null && data != []) {
            return res.status(200).send({
                error: false,
                msg: `This data is from catch`,
                data: JSON.parse(data)
              })
        } else {
            pgClient.query(`SELECT * FROM cards WHERE name = '${name}' AND surname = '${surname}'`)
            .then( data => {
                redisClient.setex(name+surname, 600, JSON.stringify(data.rows));
                res.status(200).json(data.rows)
            })
            .catch( err => {
                console.log(err);
            })
        }
    })
})



function StringToBool(value){
    res = false;
    if(value == "true"){
        res = true;
    } else {
        res = false;
    }
    return res;
}

//PORT
const PORT = 8080;
app.listen(PORT, () => {
    console.log('API listening on port '+PORT);
});