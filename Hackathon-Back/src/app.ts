import express from 'express';
import 'dotenv/config';
import router from './routes'; // Assurez-vous que le chemin est correct

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Utilisez le routeur pour vos routes d'API
app.use(router);

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
