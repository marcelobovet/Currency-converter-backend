const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
});

UserSchema.pre("save", function (next) {
    let user = this;
    if (!this.isModified("password")) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

mongoose
    .model("User", UserSchema)
    .find()
    .then((result, err) => {
        if (!result.length) {
            const User = mongoose.model("User", UserSchema);
            const admin = new User({
                email: "rrecabarren@4axis.cl",
                name: "Rodrigo",
                password: "12345678",
                role: "6516273f7817fbac9d142662",
            });
            admin.save();
        }
    });


module.exports = mongoose.model("User", UserSchema);
