"use strict";

const express = require("express");
const app = express();
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));
app.use('/', express.static(__dirname));


const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI;
let mongoClient = MongoClient;


app.get('/', function (req, res) {
    res.render("index")
    res.send("Hi!")
})

app.get('/exercises', function (req, res) {
    getALLExercises().then(exercises => {
        res.send(JSON.stringify(exercises));
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
