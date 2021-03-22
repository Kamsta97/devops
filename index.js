const express =require("express");
const cors = require('cors')
var bodyParser = require('body-parser')
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

        pgClient.query('DROP TABLE IF EXISTS numbers')
            .catch( (err) => {
            console.log(err);
        })

        pgClient.query('CREATE TABLE numbers (i integer);')
            .catch( (err) => {
            console.log(err);
        })

        pgClient.query('INSERT INTO numbers (i) VALUES (1),(2),(3);')
            .catch( (err) => {
            console.log(err);
        })

        pgClient.query(`
            CREATE TABLE IF NOT EXISTS cards
            (
                id SERIAL NOT NULL,
                name varchar(40) NOT NULL,
                surname varchar(40) NOT NULL,
                overall integer NOT NULL,
                rare boolean NOT NULL,
                club varchar(40) NOT NULL,
                nationality varchar(40) NOT NULL,
                CONSTRAINT cards_pkey PRIMARY KEY (id)
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
    let query = `INSERT INTO cards (name,surname,overall,rare,club,nationality) VALUES (
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


app.get("/getCardById/:id", (req,res) => {
    var id = req.params.id;
    pgClient.query('SELECT * FROM cards WHERE id = '+id+'')
    .then( res => {
        console.log(res);
    })
    .catch( err => {
        console.log(err);
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