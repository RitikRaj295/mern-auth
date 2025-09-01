import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  user: process.env.PGUSERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.connect()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.error("Database not connected due to:", error.message);
  });

export default pool;
