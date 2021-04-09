const controller = require("../controllers/exercise.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/test", controller.upsertExercise)
    app.get("/exercises", controller.getAllExercises)
};