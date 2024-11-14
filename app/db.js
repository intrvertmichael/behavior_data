import postgres from "postgres"

export default postgres("postgres://", {
  host: process.env.PGHOST,
  port: process.env.PGPORT, // Postgres server port[s]
  database: process.env.PGDATABASE, // Name of database to connect to
  username: process.env.PGUSER, // Username of database user
  password: process.env.PGPASSWORD, // Password of database user
  ssl: "require",
})
