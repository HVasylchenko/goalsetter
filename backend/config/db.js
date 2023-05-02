const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const coon = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${coon.connection.host}`.cyan.underline)
    } catch (error) {
        console.log( error);
        process.exit(1)
        
    }
}

module.exports = connectDB
