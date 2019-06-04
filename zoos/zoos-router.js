// const knex = require('knex')

const router = require('express').Router();

const Zoos = require('./zoos-model')

// const knexConfig = {
//     client: 'sqlite3',
//     connection: {
//         filename: './data/lambda.db3'
//     },
// }

// const db = knex(knexConfig)


router.get('/', (req, res) => {
    Zoos.find('zoos')
    .then(zoos => {
        res.status(200).json(zoos)
    })
    .catch(error => {
        res.status(500).json('server error')
    })
})


module.exports = router;