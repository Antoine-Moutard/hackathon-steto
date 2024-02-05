"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("./database/database"));
// Créez une instance de Router
const router = (0, express_1.Router)();
// Définition des routes
router.get('/', (req, res) => {
    res.send('Bienvenue sur mon API !');
});
router.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Établir la connexion
        const connection = yield (0, database_1.default)();
        // Exécuter la requête
        const [users] = yield connection.query('SELECT * FROM patient');
        // Fermer la connexion
        yield connection.end();
        // Envoyer la réponse
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
}));
exports.default = router;
