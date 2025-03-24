import mysql from 'mysql2/promise';
import express from 'express';


const pool = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: 'hyf',
});

const searchTrainee = async (lastName)  =>{
  try {
    const query = `SELECT * FROM trainees WHERE last_name like '%${lastName}%' LIMIT 10;`
    console.log(query);
    const [rows] = await pool.execute(query);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
  }
}


const app = express();
app.get('/search', async (req, res) => {
  const lastName = req.query.lastName;
  const trainees = await searchTrainee(lastName);
  res.json(trainees);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


