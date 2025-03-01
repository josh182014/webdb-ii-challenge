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

router.get('/:id', (req, res) => {
    db('zoos').where({id: req.params.id})
    .first()
    .then(response => {
        if (response) {
            res.status(200).json(response)
        }
        else {
            res.status(404).json("Zoo not found.")
        }
    })
    .catch(error => {
      res.status(500).json({message: `server error, ${error}`})
    })
});

router.delete('/:id', (req, res) => {
    db('zoos').where({id: req.params.id})
    .del()
    .then(response => {
        if (response) {
            res.status(200).json(`${response} record(s) deleted`)
        }
        else {
            res.status(404).json("Zoo not found.")
        }
    })
    .catch(error => {
      res.status(500).json({message: `server error, ${error}`})
    })
});

router.put('/:id', (req, res) => {
    const changes = req.body
    db('zoos')
    .where({id: req.params.id })
    .update(changes)
    .then(response => {
        if (response > 0) {
        res.status(200).json({message: `${response} records updated.`})
        }
        else {
        res.status(404).json({message: 'Record not found.'})
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Server error', errorMessage: error})
    })
})

module.exports = router;