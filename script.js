"use strict";

const express = require("express");
const app = express();

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));
app.use('/', express.static(__dirname));
app.set('view engine', 'ejs');

const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI;
let mongoClient = MongoClient;


app.get('/', function (req, res) {
    res.sendFile("index")
})

app.get('/exercises', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    getALLExercises().then(exercises => {
        res.json(JSON.stringify(exercises));
    });
})


function getALLExercises() {
    let db;
    return mongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((client) => {
            db = client.db("exercises");
            return db.collection("exercise").find().toArray();
        })
        .then(function (results) {
                let values = [];
                if (results) {
                    for (let i = 0; i < results.length; ++i) {
                        let exercise = {
                            id: results[i]._id,
                            name: results[i].name,
                            description: results[i].description,
                            category: results[i].category,
                            imagePrimary: results[i].imagePrimary,
                            imageSecondary: results[i].imageSecondary,
                            equipment: results[i].equipment,
                            difficulty: results[i].difficulty,
                        };
                        values.push(exercise);
                    }
                }
                return values;
            }
        )
        .catch(err => {
            console.log(err);
        });
}
