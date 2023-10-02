const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: String,
});

mongoose
    .model("Role", RoleSchema)
    .find()
    .then((result, err) => {
        if (!result.length) {
            mongoose.model("Role", RoleSchema).create([
                { _id: "6516273f7817fbac9d142662", name: "admin" },
                { _id: "6516273f7817fbac9d142663", name: "user" },
            ]);
        }
    });

module.exports = mongoose.model("Role", RoleSchema);
