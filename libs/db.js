import mysql from "mysql2/promise";

const pool = mysql.createPool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    queueLimit: 0,
});

export default pool;
