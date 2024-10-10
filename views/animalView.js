// Render a list of animals as HTML
exports.renderAnimalList = (animals) => {
    let html = '<h1>Animal List</h1><ul>';
    animals.forEach(animal => {
        html += `<li>${animal.name} (Species: ${animal.species}, Age: ${animal.age}, Favorite Food: ${animal.favoriteFood})</li>`;
    });
    html += '</ul>';
    return html;
};

// Render a form to add an animal
exports.renderAnimalForm = () => {
    return `
        <h1>Add Update Animal</h1>
        <form method="POST" action="/animals">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>
            <label for="species">Species:</label>
            <input type="text" id="species" name="species" required><br>
            <label for="age">Age:</label>
            <input type="number" id="age" name="age" min="0" required><br>
            <label for="favoriteFood">Favorite Food:</label>
            <input type="text" id="favoriteFood" name="favoriteFood" required><br>
            <button type="submit">Submit</button>
        </form>
    `;
};