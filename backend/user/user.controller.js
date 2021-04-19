const User = require('./user.model');

//Create new User
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {        
        return res.status(400).send({
            message: "Cannot be empty"
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name, 
        email: req.body.email
    });

    // Save User in the database
    user.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Find a single User with a nameId
exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then(name => {
        if(!name) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(name);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something went wrong retrieving the name with id " + req.params.id
        });
    });
};

// Update a User
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Fields cannot be empty"
        });
    }

    // Find and update User with the request body
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name, 
        email: req.body.email
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something went wrong updating with id " + req.params.id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    User.findByIdAndRemove(req.params.id)
    .then(name => {
        if(!name) {
            return res.status(404).send({
                message: "Name not found with id " + req.params.id
            });
        }
        res.send({message: "Name deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Name not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete name with id " + req.params.id
        });
    });
};