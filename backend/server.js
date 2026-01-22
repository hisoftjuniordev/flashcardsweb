const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Srednja oprema (Middleware)
app.use(cors({
  origin: 'https://flashcards-igra.onrender.com' // Tvoj Frontend naslov iz 3. koraka
}));
app.use(express.json());

// Povezava z MongoDB - naslov beremo iz .env datoteke
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Uspešno povezan z MongoDB Atlas'))
    .catch(err => {
        console.error('❌ Napaka pri povezavi z MongoDB:');
        console.error(err.message);
    });

// Definicija modela za kartice
const CardSchema = new mongoose.Schema({
    term: { type: String, required: true },
    definition: { type: String, required: true }
});
const Card = mongoose.model('Card', CardSchema);

// API pot za pridobivanje vseh kartic
app.get('/api/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: "Napaka pri branju podatkov." });
    }
});

// Zagon strežnika
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend teče na: http://localhost:${PORT}`);
});