import express from 'express';
import connection from './database/database';
import connectDB from './database/database';


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Express avec TypeScript !');
});

app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});

connectDB();