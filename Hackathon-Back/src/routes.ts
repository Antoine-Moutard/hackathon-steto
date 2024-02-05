import { Router } from 'express';
import db from './database/database';



// Créez une instance de Router
const router = Router();

// Définition des routes
router.get('/', (req, res) => {
    res.send('Bienvenue sur mon API !');
});




router.get('/api/getPatients', async (req, res) => {
    try {
        // Établir la connexion
        const connection = await db();

        // Exécuter la requête
        const [users] = await connection.query('SELECT * FROM patient');
        
        // Fermer la connexion
        await connection.end();

        // Envoyer la réponse
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
});


router.get('/api/getDoctors', async (req, res) => {
    try {
        // Établir la connexion
        const connection = await db();

        // Exécuter la requête
        const [users] = await connection.query("SELECT * FROM `practitioner` join careteamparticipant on practitioner.id = careteamparticipant.memberId where role = 'doctor'");
        
        // Fermer la connexion
        await connection.end();

        // Envoyer la réponse
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
});


router.get('/api/getNurses', async (req, res) => {
    try {
        // Établir la connexion
        const connection = await db();

        // Exécuter la requête
        const [users] = await connection.query("SELECT * FROM `practitioner` join careteamparticipant on practitioner.id = careteamparticipant.memberId where role = 'nurse'");
        
        // Fermer la connexion
        await connection.end();

        // Envoyer la réponse
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
});




export default router;
