import pg from "pg";

export function connect() {
  const dbConnectionString = process.env.DATABASE_URL;
  const db = new pg.Pool({
    connectionString: dbConnectionString,
  });
  return db;
}

export const db = connect();
