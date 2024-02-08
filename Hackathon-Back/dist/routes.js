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
/**
 * Creates an instance of the Router.
 */
const router = (0, express_1.Router)();
/**
 * Defines the routes for the API.
 */
router.get("/", (req, res) => {
    res.send("Welcome to my API!");
});
/**
 * Gets a list of patients.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get("/api/getPatients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Establishes a connection
        const connection = yield (0, database_1.default)();
        // Executes the query
        const [users] = yield connection.query("SELECT patient.id, patient.firstname, patient.lastname, patient.email, careteam.id as careTeamId FROM patient JOIN careteam ON patient.id = careteam.subjectId");
        // Closes the connection
        yield connection.end();
        // Sends the response
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ message: "Error fetching users" });
    }
}));
/**
 * Gets a list of doctors.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get("/api/getDoctors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Establishes a connection
        const connection = yield (0, database_1.default)();
        // Executes the query
        const [users] = yield connection.query("SELECT * FROM `practitioner` join careteamparticipant on practitioner.id = careteamparticipant.memberId where role = 'doctor'");
        // Closes the connection
        yield connection.end();
        // Sends the response
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ message: "Error fetching users" });
    }
}));
/**
 * Gets a list of nurses.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get("/api/getNurses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Establishes a connection
        const connection = yield (0, database_1.default)();
        // Executes the query
        const [users] = yield connection.query("SELECT * FROM `practitioner` join careteamparticipant on practitioner.id = careteamparticipant.memberId where role = 'nurse'");
        // Closes the connection
        yield connection.end();
        // Sends the response
        res.json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ message: "Error fetching users" });
    }
}));
/**
 * Sends a message.
 * @param req - The request object.
 * @param res - The response object.
 */
router.post("/api/sendMessage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieves the message data from the request body
        const { senderId, messageContent, careTeamId } = req.body;
        if (!senderId || !messageContent || !careTeamId) {
            return res
                .status(400)
                .json({ message: "Missing data to send the message" });
        }
        // Establishes a connection
        const connection = yield (0, database_1.default)();
        // Prepares and executes the query
        const sql = "INSERT INTO message (senderId, careTeamId, content, createdAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";
        yield connection.query(sql, [senderId, careTeamId, messageContent]);
        // Closes the connection
        yield connection.end();
        // Sends the response
        res.status(200).json({ message: "Message sent successfully" });
    }
    catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Error sending message" });
    }
}));
/**
 * Gets messages for a given care team ID.
 * @param req - The request object.
 * @param res - The response object.
 */
router.get("/api/getMessageByPatientId/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Establishes a connection
        const connection = yield (0, database_1.default)();
        if (!req.params.id) {
            return res
                .status(400)
                .json({ message: "Missing data to send the message" });
        }
        // Executes the query
        const [messages] = yield connection.query("SELECT m.content AS message_content, m.createdAt AS message_date, COALESCE(CONCAT(pr.firstname, ' ', pr.lastname), CONCAT(p.firstname, ' ', p.lastname)) AS sender_name, m.id FROM message m JOIN careteam c ON m.careTeamId = c.id LEFT JOIN practitioner pr ON m.senderId = pr.id AND pr.id IS NOT NULL LEFT JOIN patient p ON m.senderId = p.id AND p.id IS NOT NULL WHERE c.subjectId =" + [req.params.id] + "order by m.createdAt ASC");
        // Closes the connection
        yield connection.end();
        // Sends the response
        res.json(messages);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ message: "Error fetching users" });
    }
    //   try {
    //     // Retrieves the message data from the request body
    //     const { careTeamId } = req.body;
    //     if (!careTeamId) {
    //       return res
    //         .status(400)
    //         .json({ message: "Missing data to send the message" });
    //     }
    //     // Establishes a connection
    //     const connection = await db();
    //     // Prepares and executes the query
    // // const sql = "INSERT INTO message (senderId, content) VALUES (?, ?)";
    //     // const sql = "SELECT * FROM MESSAGE Where careTeamId = ?";
    //     const [messages] = await connection.query(
    //       "SELECT m.content AS message_content, m.createdAt AS message_date, CONCAT(p.firstname, ' ', p.lastname) AS sender_name, m.id FROM message m JOIN careteam c ON m.careTeamId = c.id LEFT JOIN practitioner pr ON m.senderId = pr.id LEFT JOIN patient p ON m.senderId = p.id WHERE c.subjectId = ?"
    //     );
    //     // await connection.query(sql, [careTeamId]);
    //     // Closes the connection
    //     await connection.end();
    //     // Sends the response
    //     res.status(200).json(messages);
    //     } catch (error) {
    //       console.error("Error retrieving message:", error);
    //       res.status(500).json({ message: "Error retrieving message" });
    //    }
}));
/**
 * Gets non-pro messages for a given care team ID.
 * @param req - The request object.
 * @param res - The response object.
 */
router.post("/api/getNotProMessageByCareTeamId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieves the message data from the request body
        const { careTeamId } = req.body;
        if (!careTeamId) {
            return res
                .status(400)
                .json({ message: "Missing data to send the message" });
        }
        // Establishes a connection
        const connection = yield (0, database_1.default)();
        // Prepares and executes the query
        // const sql = "INSERT INTO message (senderId, content) VALUES (?, ?)";
        const sql = "SELECT * FROM MESSAGE Where careTeamId = ? and messageType = 'group'";
        yield connection.query(sql, [careTeamId]);
        // Closes the connection
        yield connection.end();
        // Sends the response
        res.status(200).json({ message: "Message retrieved successfully" });
    }
    catch (error) {
        console.error("Error retrieving message:", error);
        res
            .status(500)
            .json({ message: "Error retrieving message" });
    }
}));
/**
 * Gets patients for a given practitioner ID.
 * @param req - The request object.
 * @param res - The response object.
 */
router.post("/api/getPatientByProId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieves the message data from the request body
        const { proId } = req.body;
        if (!proId) {
            return res
                .status(400)
                .json({ message: "Missing data to send the message" });
        }
        // Establishes a connection
        const connection = yield (0, database_1.default)();
        // Prepares and executes the query
        const sql = "SELECT Patient.* FROM Practitioner JOIN CareTeamParticipant ON Practitioner.id = CareTeamParticipant.memberId JOIN CareTeam ON CareTeamParticipant.careTeamId = CareTeam.id JOIN Patient ON CareTeam.subjectId = Patient.id WHERE Practitioner.id = ?";
        yield connection.query(sql, [proId]);
        // Closes the connection
        yield connection.end();
        // Sends the response
        res.status(200).json({ message: "Patients retrieved successfully" });
    }
    catch (error) {
        console.error("Error retrieving patients:", error);
        res
            .status(500)
            .json({ message: "Error retrieving patients" });
    }
}));
exports.default = router;
