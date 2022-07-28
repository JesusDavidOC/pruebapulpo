module.exports = (app) => {
    const user = require('../controllers/users.controller.js');
    //found users by filter
    app.post('/users/filters', user.getByFilters);
    // Create a new user
    app.post('/users', user.create); 
    // Login into account
    app.post('/users/login', user.login);  
    // Update a user by DNI
    app.put('/users/:username', user.update);
           
}