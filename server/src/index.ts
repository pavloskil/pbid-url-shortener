import db from './db';
import app from './app';

const port = process.env.PORT || 5000;

export async function main() {
  try {
    await db.connect();
    app.listen(port, () => {
      console.log(`pbid-express app is listening on port ${port}!`);
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch(err => console.error(err));


function cleanUp() {
  db.disconnect();
  console.info('DB connection closed');
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType, cleanUp.bind(null, eventType));
});

