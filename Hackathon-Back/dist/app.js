"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes")); // Assurez-vous que le chemin est correct
const cors = require("cors");
const app = (0, express_1.default)();
const PORT = process.env.APP_PORT;
//middleware pour accépter les requetes du frontend
// Configuration des options CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Remplacez cela par l'URL de votre front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Autoriser les cookies et les en-têtes d'autorisation
    optionsSuccessStatus: 204, // Répondre avec un code 204 si la requête CORS pré-vérification est réussie
};
app.use(cors(corsOptions));
app.use(express_1.default.json());
// Utilisez le routeur pour vos routes d'API
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
