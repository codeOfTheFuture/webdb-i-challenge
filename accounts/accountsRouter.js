const express = require('express');
const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/budget.db3',
  },
  useNullAsDefault: true,
});

const router = express.Router();

router.get('/', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  const {
    params: { id },
  } = req;
  db('accounts')
    .where({ id: id })
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  const account = req.body;

  db('accounts')
    .insert(account, 'id')
    .then(arrayOfIds => {
      const idOfLastRecord = arrayOfIds[0];

      res.status(201).json(idOfLastRecord);
    })
    .catch(error => res.status(500).json(error));
});

router.put('/:id', (req, res) => {
  const {
    params: { id },
    body: body,
  } = req;
  db('accounts')
    .where({ id: id })
    .update(body)
    .then(account => {
      res.status(200).json({ message: `${account} record(s) updated` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
