import mysql from 'mysql2/promise';
import express from 'express';


const pool = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: 'hyf',
  multipleStatements: true,
});

const searchTrainee = async (lastName)  =>{
  const query = `SELECT * FROM trainees WHERE last_name like '%${lastName}%' LIMIT 10;`;
  try {
    const [rows] = await pool.execute(query);
    console.log(`✅ ${query}`);
    return rows;
  } catch (error) {
    console.log(`❌ ${query}`);
    return null;
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


