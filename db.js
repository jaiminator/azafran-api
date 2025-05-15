const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

// Conectarse a la db
const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connect successfully");
    } catch (error) {
        console.log(error);
        throw new Error("Error to connect with database");
    }
}

module.exports = { dbConnection };