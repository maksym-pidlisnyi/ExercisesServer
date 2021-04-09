const Exercise = require("../models/exercise.model");

exports.upsertExercise = (req, res) => {
    const exercise = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        imagePrimary: req.body.imagePrimary,
        imageSecondary: req.body.imageSecondary,
        equipment: req.body.equipment,
        difficulty: req.body.difficulty,
    }
    Exercise.findOneAndUpdate({'name': req.body.name}, exercise, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});

        return res.send('Course was saved successfully!');
    });
};

exports.getAllExercises = (req, res) => {
    Exercise.find({}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
};