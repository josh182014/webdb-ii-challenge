const knex = require('knex')

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/lambda.db3'
        },
    }
}

