const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// If ideasID is sent then it will find it in the database and send it in the request. If its not found then a 404 error will be sent.
ideasRouter.param('id', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

// Will create new idea and send a 201 status
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

ideasRouter.get('/:id', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
  let updatedInstance = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedInstance);
});

// Will delete idea when an id has been sent on an idea.
ideasRouter.delete('/:id', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.id);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

