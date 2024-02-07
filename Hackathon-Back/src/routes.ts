import { Router } from "express";
import db from "./database/database";

// Créez une instance de Router
const router = Router();

// Définition des routes
router.get("/", (req, res) => {
  res.send("Bienvenue sur mon API !");
});

router.get("/api/getPatients", async (req, res) => {
  try {
    // Établir la connexion
    const connection = await db();

    // Exécuter la requête
    const [users] = await connection.query("SELECT patient.id, patient.firstname, patient.lastname, patient.email, careteam.id as careTeamId FROM patient JOIN careteam ON patient.id = careteam.subjectId");

    // Fermer la connexion
    await connection.end();

    // Envoyer la réponse
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

router.get("/api/getDoctors", async (req, res) => {
  try {
    // Établir la connexion
    const connection = await db();

    // Exécuter la requête
    const [users] = await connection.query(
      "SELECT * FROM `practitioner` join careteamparticipant on practitioner.id = careteamparticipant.memberId where role = 'doctor'"
    );

    // Fermer la connexion
    await connection.end();

    // Envoyer la réponse
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

router.get("/api/getNurses", async (req, res) => {
  try {
    // Établir la connexion
    const connection = await db();

    // Exécuter la requête
    const [users] = await connection.query(
      "SELECT * FROM `practitioner` join careteamparticipant on practitioner.id = careteamparticipant.memberId where role = 'nurse'"
    );

    // Fermer la connexion
    await connection.end();

    // Envoyer la réponse
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

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




router.post("/api/sendMessage", async (req, res) => {
  console.log(req)
    try {
    // Récupérez les données du message à partir du corps de la requête
    const { senderId, messageContent, careTeamId } = req.body;

    if (!senderId || !messageContent || !careTeamId) {
      return res.status(400).json({ message: "Données manquantes pour envoyer le message" });
    }

    // Établir la connexion
    const connection = await db();

    // Préparez et exécutez la requête d'insertion

    // const sql = "INSERT INTO message (senderId, content) VALUES (?, ?)";
    const sql = "INSERT INTO message (senderId, careTeamId, content) VALUES (?, ?, ?)";

    
    await connection.query(sql, [senderId, careTeamId, messageContent]);

    // Fermer la connexion
    await connection.end();

    // Envoyer la réponse
    res.status(200).json({ message: "Message envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    res.status(500).json({ message: "Erreur lors de l'envoi du message" });
  }
});


export default router;
