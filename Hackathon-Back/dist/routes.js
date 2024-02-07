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
router.get("/", (req, res) => {
    res.send("Bienvenue sur mon API !");
});
router.get("/api/getPatients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Établir la connexion
        const connection = yield (0, database_1.default)();
        // Exécuter la requête
        const [users] = yield connection.query("SELECT patient.id, patient.firstname, patient.lastname, patient.email, careteam.id as careTeamId FROM patient JOIN careteam ON patient.id = careteam.subjectId");
        // Fermer la connexion
        yield connection.end();
        // Envoyer la réponse
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
}));
router.get("/api/getDoctors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Établir la connexion
        const connection = yield (0, database_1.default)();
        // Exécuter la requête
        const [users] = yield connection.query("SELECT * FROM `practitioner` join careteamparticipant on practitioner.id = careteamparticipant.memberId where role = 'doctor'");
        // Fermer la connexion
        yield connection.end();
        // Envoyer la réponse
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
}));
router.get("/api/getNurses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Établir la connexion
        const connection = yield (0, database_1.default)();
        // Exécuter la requête
        const [users] = yield connection.query("SELECT * FROM `practitioner` join careteamparticipant on practitioner.id = careteamparticipant.memberId where role = 'nurse'");
        // Fermer la connexion
        yield connection.end();
        // Envoyer la réponse
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
}));
// router.get("/api/getPatientById/:PatientID", async (req, res) => {
//   try {
//     // Établir la connexion
//     const connection = await db();
//     // Exécuter la requête
//     const [users] = await connection.query(
//       "SELECT * FROM patient WHERE patient.id = ?"
//     );
//     db.query(sql, [userId], (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Erreur lors de la requête SQL.');
//       }
//     // Fermer la connexion
//     await connection.end();
//     // Envoyer la réponse
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res
//       .status(500)
//       .json({ message: "Erreur lors de la récupération des utilisateurs" });
//   }
// });
router.post("/api/sendMessage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupérez les données du message à partir du corps de la requête
        const { senderId, messageContent, careTeamId } = req.body;
        if (!senderId || !messageContent || !careTeamId) {
            return res.status(400).json({ message: "Données manquantes pour envoyer le message" });
        }
        // Établir la connexion
        const connection = yield (0, database_1.default)();
        // Préparez et exécutez la requête d'insertion
        // const sql = "INSERT INTO message (senderId, content) VALUES (?, ?)";
        const sql = "INSERT INTO message (senderId, careTeamId, content) VALUES (?, ?, ?)";
        yield connection.query(sql, [senderId, careTeamId, messageContent]);
        // Fermer la connexion
        yield connection.end();
        // Envoyer la réponse
        res.status(200).json({ message: "Message envoyé avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
        res.status(500).json({ message: "Erreur lors de l'envoi du message" });
    }
}));
exports.default = router;
