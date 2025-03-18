import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const schemaPath = path.join(__dirname, 'schema.sql');
const db = new sqlite3.Database('db.sqlite', (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to the SQLite database.");

        // Read schema.sql and execute it
        const schema = fs.readFileSync(schemaPath, 'utf8');
        db.exec(schema, (err) => {
            if (err) {
                console.error("Error running schema.sql:", err.message);
            } else {
                console.log("Database schema applied successfully.");
            }
        });
    }
});

export default db;
