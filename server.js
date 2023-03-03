require('dotenv').config();

const { createApp } = require('./app');
// const { connection } = require('./src/models/dataSource');
const { dataSource } = require('./src/models/dataSource');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  // await connection.connect();
  await dataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized');
    })
    .catch(() => {
      console.log('Errors occurred in Data Source initializing');
      dataSource.destroy();
    });

  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}`);
    });
  } catch (err) {
    console.error('Error occurred during starting server', err);
  }
};

startServer();
