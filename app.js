const express = require('express');
const bodyParser = require('body-parser');
const { limitRequests } = require('./middleware/rateLimit');
const { handleError } = require('./middleware/errorHandler');
const animalController = require('./controllers/animalController');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limitRequests);

// Routes for animal CRUD operations
app.get('/animals', animalController.getAnimals);
app.get('/animal-form', animalController.getAnimalForm);
app.post('/animals', animalController.addAnimal);
app.put('/animals/:id', animalController.updateAnimal);
app.delete('/animals/:id', animalController.deleteAnimal);

// Global error handling
app.use(handleError);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
