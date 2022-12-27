const knex = require('knex')("DATABASE_URL" in process.env? 
{
    client: 'pg',
    connection: process.env.DATABASE_URL,
}
:
{
    client: process.env.DB_DIALECT,
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

module.exports = knex;