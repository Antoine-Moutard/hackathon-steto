import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Express avec TypeScript !');
});

app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
