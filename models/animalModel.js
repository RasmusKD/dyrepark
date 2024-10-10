let animals = [
    { id: 1, name: 'Lion', species: 'lion', age: 5, favoriteFood: 'Meat' },
    { id: 2, name: 'Elephant', species: 'elephant', age: 10, favoriteFood: 'Fruits' },
    { id: 3, name: 'Penguin', species: 'penguin', age: 3, favoriteFood: 'Fish' },
];

// Get all animal data
exports.getAnimalData = () => {
    return animals;
};

// Save new animal data
exports.saveAnimalData = (newData) => {
    animals = newData;
};
