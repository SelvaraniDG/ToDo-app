const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://selvaranicr:wrO10hqmsJrhcTOl@cluster0.hi68oet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Mongodb connected");
    } catch (error) {
    console.log(error);
    process.exit(1);
}}

module.exports = connectDB;