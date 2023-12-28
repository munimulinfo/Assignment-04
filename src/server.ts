import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`server is running on this port ${config.port}`);
    });
  } catch (eroor) {
    console.log(eroor);
  }
}

main();

//Asynccronus unhandleRejection listener
process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//syncronus code uncaughtException listenre
process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
