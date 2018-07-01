require('dotenv').load({ path: '.env' });
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const app = require("./app");

if (process.env.MODE == "development") {
	mongoose.connect(process.env.DEVELOPMENT_DB_URI);
} else if (process.env.MODE == "production") {
	mongoose.connect(process.env.PRODUCTION_DB_URI)
}

mongoose.connection.on('error', async (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

const server = app.listen(process.env.PORT, () => {
	console.log(`Main server running → port ${process.env.PORT}`)
});