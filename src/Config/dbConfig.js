const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');


async function connectDB(){
    try {
        await mongoose.connect(serverConfig.DB_URL)
        
        console.log(`Connected To database Successfully`);
    } catch (error) {
        console.log(`Something gone wrong ! Not able to connect database`);
        console.log(error);
    }
}

module.exports = connectDB