import express from 'express';
import connection from './database';


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur Express avec TypeScript !');
});

app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});


const query = 'SELECT * FROM patient';


async function executeQuery() {
  try {
    const [rows, fields] = await connection.execute(query);
    // Traitez les résultats ici
  } catch (error) {
    // Gérez l'erreur ici
  }
}

