const mongoose = require('mongoose');

// 1. Povezava (Zamenjaj s svojim Connection Stringom)
const MONGO_URI = 'mongodb+srv://admin1:enaadminenaadmin1@cluster0.jw7igdr.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Povezan za uvoz...'))
  .catch(err => console.error(err));

// 2. Definiranje modela
const Card = mongoose.model('Card', new mongoose.Schema({
  term: String,
  definition: String
}));

// 3. Podatki
const data = [
  { term: "Bruto plača", definition: "Celotni znesek plače pred davki in prispevki." },
  { term: "Neto plača", definition: "Znesek, ki ga zaposleni prejme na TRR." },
  { term: "Akontacija dohodnine", definition: "Davek, ki se odvede državi glede na davčne razrede." },
  { term: "Prispevki delojemalca", definition: "22,1 % od bruto plače (pokojninsko, zdravstveno...)." },
  { term: "Prispevki delodajalca", definition: "Dodatnih 16,1 % na bruto plačo, ki jih plača podjetje." },
  { term: "Regres", definition: "Letni dodatek za dopust, vsaj v višini minimalne plače." },
  { term: "Povračilo za malico", definition: "Neobdavčen znesek za prehrano med delom." },
  { term: "Prevoz na delo", definition: "Povračilo stroškov poti na delo (običajno 0,21 €/km)." },
  { term: "Minimalna plača", definition: "Najnižja zakonsko določena mesečna plača v RS." },
  { term: "Boniteta", definition: "Ugodnost v naravi (npr. uporaba službenega vozila v zasebne namene)." }
];

// 4. Funkcija za uvoz
const seedDB = async () => {
  await Card.deleteMany({}); // Opcijsko: izbriše stare podatke, da ni podvojitev
  await Card.insertMany(data);
  console.log('Podatki so bili uspešno uvoženi!');
  process.exit();
};

seedDB();