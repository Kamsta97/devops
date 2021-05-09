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
        throw err;
    })
})

app.delete("/delete/:id", cors(), (req,res) => {
    var id = req.params.id;
    try {
        pgClient.query(`DELETE FROM cards WHERE id = '${id}'`, (error, results) => {
            if (error) {
                console.log(error);
                throw error;
            }
            res.status(200).send(`Card: ${id} was deleted`);
          })
    } catch (error) {
        console.log(error);
        throw error;
    }
})

app.put("/update/:id", cors(), (req,res) => {
    const {id,name, surname, overall, rare, club, nationality} = req.body
    console.log(overall);
    console.log(rare);
    console.log(req.body);
    pgClient.query(`UPDATE cards SET 
    name='${name}',
    overall = ${overall}, 
    rare = ${rare}, 
    club = '${club}', 
    nationality = '${nationality}' 
    where id = '${id}'`, 
    (error, result) => {
        if (error) {
            console.log(error);
            throw error;
        }
        res.status(200).send(`Card ${name} ${surname} was updated`);
    });
})

app.get("/getCardById/:id",cors(), (req,res) => {
    var id = req.params.id;
    redisClient.exists(id, (error, result) => {
        if (error) {
          console.log(error);
          throw error;
        }
    
        if(result == 1) {
          console.log("Data from redis");
          redisClient.get(id, function(error, object) {
            if(error) {
                console.log(error);
                throw error;
            }
            res.status(200).json(JSON.parse(object));
          })
        } else {
            console.log("Data from db")
            pgClient.query(`SELECT * FROM cards WHERE id = '${id}'`)
            .then( data => {
                console.log(JSON.stringify(data.rows));
                 redisClient.setex(id, 600, JSON.stringify(data.rows));
                 res.status(200).json(data.rows)
            })
            .catch( err => {
                throw err;
                console.log(err);
            })
          }
    });
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
const PORT = 4000;
app.listen(PORT, () => {
    console.log('API listening on port '+PORT);
});