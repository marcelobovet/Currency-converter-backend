const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");
const seeder = require("mongoose-seed");

mongoose
    .connect(config.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => {
        seeder.loadModels(['./models/role', './models/user'])
        console.log("Database connected");

        app.listen(config.port, () => {
            console.log(`API REST CORRIENDO EN http://localhost:${config.port}`);
        });
    })
    .catch((error) => {
        console.log(error);

    });

