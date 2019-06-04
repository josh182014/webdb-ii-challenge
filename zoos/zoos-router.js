const knex = require('knex')

const router = require('express').Router();

// const Zoos = require('./zoos-model')

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3'
    },
}

const db = knex(knexConfig)


router.get('/', (req, res) => {
    db('zoos')
    .then(zoos => {
        res.status(200).json(zoos)
    })
    .catch(error => {
        res.status(500).json('server error')
    })
})

router.post('/', (req, res) => {
    if (req.body.name) {
        db('zoos')
        .insert(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json('server error')
        })
    }
    else {
        res.status(404).json('Please provide a name')
    }
})

module.exports = router;