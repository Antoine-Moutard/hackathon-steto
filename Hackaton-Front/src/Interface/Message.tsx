import { Patient } from "./Patient";

export interface Message {
    careTeamId: string;
    senderId: Patient;
    content: string;
    // createdAt: string;
    messageType:string
}