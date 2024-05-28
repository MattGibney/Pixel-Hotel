/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'pg',
  connection: {
    host: process.env.API_RDS_HOSTNAME,
    port: process.env.API_RDS_PORT,
    user: process.env.API_RDS_USERNAME,
    password: process.env.API_RDS_PASSWORD,
    database: process.env.API_RDS_DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  jsonbSupport: true,
  migrations: {
    tableName: 'knex_migrations',
    directory: __dirname + '/db/migrations',
  },
};
