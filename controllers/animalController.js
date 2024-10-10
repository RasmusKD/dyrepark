const { check, validationResult } = require('express-validator');
const animalModel = require('../models/animalModel');
const animalView = require('../views/animalView');

// Validation middleware for adding or updating animals
const validateAnimal = [
    check('name').notEmpty().withMessage('Name is required'),
    check('species').notEmpty().withMessage('Species is required'),
    check('age').isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
    check('favoriteFood').notEmpty().withMessage('Favorite food is required')
];

// Get all animals
exports.getAnimals = (req, res) => {
    const animals = animalModel.getAnimalData();
    res.send(animalView.renderAnimalList(animals));
};

exports.getAnimalForm = (req, res) => {
    res.send(animalView.renderAnimalForm());
}

// Add a new animal
exports.addAnimal = [
    validateAnimal,
    (req, res) => {
        console.log('Form Data:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const animals = animalModel.getAnimalData();
        const lastId = animals.length > 0 ? animals[animals.length - 1].id : 0;
        const newAnimal = { id: lastId + 1, ...req.body };

        animals.push(newAnimal);
        animalModel.saveAnimalData(animals);
        res.status(201).json(newAnimal);
    }
];

// Update an existing animal
exports.updateAnimal = [
    validateAnimal,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const animals = animalModel.getAnimalData();
        const animalId = parseInt(req.params.id, 10);
        const animal = animals.find(a => a.id === animalId);

        if (!animal) {
            return res.status(404).json({ error: 'Animal not found' });
        }

        Object.assign(animal, req.body);
        animalModel.saveAnimalData(animals);
        res.json(animal);
    }
];

// Delete an animal
exports.deleteAnimal = (req, res) => {
    const animals = animalModel.getAnimalData();
    const animalId = parseInt(req.params.id, 10);
    const animalIndex = animals.findIndex(a => a.id === animalId);

    if (animalIndex === -1) {
        return res.status(404).json({ error: 'Animal not found' });
    }

    animals.splice(animalIndex, 1);
    animalModel.saveAnimalData(animals);
    res.status(204).send();
};
