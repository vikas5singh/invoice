
const mongoose = require('mongoose');
    let host= process.env.DATABASE_HOST;
    let type= process.env.DATABASE_TYPE;
    let port= process.env.DATABASE_PORT;
    let database= process.env.DATABASE_NAME;

let mongoUri = `${type}://${host}:${port}/${database}`
// Connect to MySQL
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error---:'));
db.once("open", function callback() {
  console.log("Db Connected");
});
module.exports = mongoose;