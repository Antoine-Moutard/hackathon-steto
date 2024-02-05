import { Router } from 'express';

// Créez une instance de Router
const router = Router();

// Définition des routes
router.get('/', (req, res) => {
    res.send('Bienvenue sur mon API !');
});

router.get('/api/users', async (req, res) => {
    // Logique pour récupérer les utilisateurs
    res.json({ message: "Liste des utilisateurs" });
});


export default router;
