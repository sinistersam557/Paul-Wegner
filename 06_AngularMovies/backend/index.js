// Movie API Project Backend
// This is a simple Express server that serves as a backend for the Movie API project.

const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(require('cors')());
app.use(express.json());

let savedMovies = [];

app.get('/', (req, res) => {
    res.send('Welcome to the Movie API Backend!');
});

// GET METHOD for Saved Movies
app.get('/api/saved-movies', (req, res) => {
    res.json(savedMovies);
});

// POST METHOD for Saved Movies
app.post('/api/saved-movies', (req, res) => {
    const movie = req.body;
    savedMovies.push(movie);
    res.status(201).json({ message: 'Movie saved successfully!', movie });
});

// DELETE METHOD for Saved Movies
app.delete('/api/saved-movies/:id', (req, res) => {
    const id = req.params.id;
    savedMovies = savedMovies.filter(movie => movie.id != id);
    res.status(204).json({ message: 'Movie deleted successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});