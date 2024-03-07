const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    schoolId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    chair: {
        type: String,
        trim: true,
        unique: true
    }
}, { collection: "users", timestamps: true })

const User = mongoose.model("User", userSchema);

module.exports = User