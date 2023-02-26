require('dotenv').config();

const { createApp } = require('./app');
const { connection } = require('./src/models/dataSource');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await connection.connect();
  // .then(() => {
  //   console.log('mysql has been connected!');
  // })
  // .catch((err) => {
  //   console.error('Error occurred during mysql connection', err);
  //   connection.destroy();
  // });

  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}`);
    });
  } catch (err) {
    console.error('Error occurred during starting server', err);
  }
};

startServer();
