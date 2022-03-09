// Importing express and Router
const meetingsRouter = require('express').Router();

// Exporting meetingsRouter
module.exports = meetingsRouter;

// Importing relavent functions from the db file to update the database. 
const {
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
    createMeeting
} = require('./db');

// Get an array all all meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

// Will allow a new meeting to be created and will save it to the database.
meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});
  

// Delete all the meetings from the database
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});
  