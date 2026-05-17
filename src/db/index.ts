import { Pool } from "pg"
import config from "../config"

export const pool=new Pool({
    connectionString:config.connection_string,
    // connectionString:"postgresql://neondb_owner:npg_q4nijLOEf1RS@ep-falling-lab-aqz1hhra-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  

})
export const initDB=async()=>{
    try{
await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    age INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()

    )
    `);
await pool.query(`
    CREATE TABLE IF NOT EXISTS profiles(
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    address TEXT,
    phone VARCHAR(15),
    gender VARCHAR(10),
     created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()

    )
    `);
    console.log("DB connected successfully")
    }
    catch(error){
         console.error("DB ERROR:", error)
    }
}