const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const e = require('express');
const { 
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');


// If minionsId is sent then it will find it in the database and send it in the request. If its not found then a 404 error will be sent.
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
      req.minion = minion;
      next();
    } else {
      res.status(404).send();
    }
});

// Will handle the homepage and send back the minions from the database.
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});
  
// Will create a new minion and save it to the database. Will also send a 201 status code along with the new minion.
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// Will get a single minion by ID.
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

// Will update a single minion by ID. Uses the updateInstanceInDatabase from the db file to update the database.
minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
});

// Will delete a single minion by ID. If the delete occurs successfully then a 204 status will be sent. A 500 status will be sent if the element is not found. 
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
});


// BONUS TASK //

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
});

// Get an array of all work for the specified minion.
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
      return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
});

// Creates a new work object and saves it to the database
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
});

// Updates a single work by ID
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
      res.status(400).send();
    } else {
      updatedWork = updateInstanceInDatabase('work', req.body);
      res.send(updatedWork);
    }
});

// Delete a single work by ID
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
});