import express from "express";
import "dotenv/config";
import router from "./routes"; // Assurez-vous que le chemin est correct

const cors = require("cors");

const app = express();
const PORT = process.env.APP_PORT;

//middleware pour accépter les requetes du frontend

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Utilisez le routeur pour vos routes d'API
app.use(router);

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
