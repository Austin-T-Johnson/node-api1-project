// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')
// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());


// ENDPOINTS

// [GET]
server.get('/', (req, res) => {
    console.log('received a request!');
    res.json({ message: 'received a request!!!' });
})

// [GET]
server.get('/api/users', (req, res) => {
    User.find().then(result => {
        res.json(result);
    })
        .catch(result => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

// [GET]
server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id).then(result => {
        if (result == null) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
            return;
        }
        res.json(result);
    })
        .catch(result => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

// [POST]
server.post('/api/users', (req, res) => {
    User.insert(req.body).then(result => {
        if (req.body.name == null || req.body.bio == null) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
        res.status(201).json(result);
        }
    })
        .catch(result => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })

})

// [PUT]
server.put('/api/users/:id', (req, res) => {
    User.update(req.params.id, req.body).then(result => {
        if (result == null) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
            return;
        } else if (req.body.name == null || req.body.bio == null) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
        res.json(result);
        }
    })
        .catch(result => {
            res.status(500).json({ message: "The user information could not be modified" })
        })
})

// [DELETE]
server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(result => {
            if (result == null) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
                return;
            }
            res.json(result);
        })
        .catch(result => {
            res.status(500).json({ message: "The user could not be removed" })
        })

})





module.exports = server; // EXPORT YOUR SERVER instead of {}
