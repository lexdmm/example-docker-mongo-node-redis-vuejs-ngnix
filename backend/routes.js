
module.exports = (app) => {
    const users = require('./user/user.controller');
    const email = require('./email/email.controller');

    // Retrieve all users
    app.get('/users', users.findAll);

    // Create a new users
    app.post('/users', users.create);    

    // Retrieve a single users with id
    app.get('/users/:id', users.findOne);

    // Update users with id
    app.put('/users/:id', users.update);

    // Delete users with id
    app.delete('/users/:id', users.delete);

    // send a new email
    app.post('/email', email.create);     
}