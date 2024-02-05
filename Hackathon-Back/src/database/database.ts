import mysql from 'mysql2/promise';

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.localhost,
      user: process.env.root,
      password: process.env.root,
      database: process.env.hackathon_steto
    });

    console.log('MySQL Connected');
    return connection;
  } catch (error) {
    console.error('MySQL Connection Failed', error);
    process.exit(1);
  }
};

export default connectDB;
