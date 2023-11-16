import { Server } from "http";
const mongoose = require('mongoose');
import app from "./app";
import config from "./app/config";

const port = 5000;

let server: Server;

async function main() {
  await mongoose.connect(config.DB_URL);


}
console.log(config.DB_URL)

async function bootstrap() {
  server = app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}

bootstrap();
