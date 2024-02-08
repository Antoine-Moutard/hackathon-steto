import { useState } from "react";
import BloodGlucoseMonitoring from "../Component/BloodMonitoringComponent";
import InsulinMonitoring from "../Component/InsulinMonitoringComponent";
import { Patient } from "../Interface/Patient";
import ChatBoxComponent from "./ChatBoxComponentPatient";
import { Message } from "../Interface/Message";
import ChatBoxComponentDoctor from "./ChatBoxComponentDoctor";
import { Pro } from "../Interface/Pro";

type PatientDataProps = {
  patient: Patient;
  onBack: () => void; // Pour permettre de retourner à la liste des patients
  listMessage: Message[],
  setListMessage:React.Dispatch<React.SetStateAction<Message[]>>,
  pro: Pro,
  setPro:React.Dispatch<React.SetStateAction<Pro>>
};

const PatientData = ({ patient, onBack,listMessage, setListMessage, pro, setPro }: PatientDataProps) => {
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxVisible(!isChatboxVisible);
    getListMessage
  };

  const getListMessage = async () => {  
    try {
      console.log("Je rentre dans la récupération")
        const response = await fetch("http://localhost:3000/api/getMessageByPatientId/'" + patient.id +"'", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
            // body: JSON.stringify({ careTeamId: patient.id}),
        });
        const data: Message[] = await response.json();
        console.log(data)
        setListMessage(data);
        // ...gestion de la réponse
    } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
    }
}

  return (
    <div className="ml-5 mt-5 space-y-2">
      <button
        onClick={onBack}
        className="text-blue-950 font-bold space-x-1 text-xl"
      >
        <i className="bi bi-caret-left-fill"></i>
        <span>Retour</span>
      </button>
      <div className="ml-10 mt-10">
        <h1 className="text-2xl text-blue-950 font-bold">
          {patient.firstname} {patient.lastname}
        </h1>
        <div className="flex space-x-2 mt-2 text-gray-600 text-sm font-bold">
          <i className="bi bi-clock text-xl flex items-center"></i>
          <p>Dernère connexion : 5 jours</p>
        </div>
      </div>
      <BloodGlucoseMonitoring />
      <InsulinMonitoring />
      <div className="fixed bottom-4 right-4">
        <button
          onClick={toggleChatbox}
          className="bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-lg px-5 py-2 space-x-2 text-xl flex items-center"
        >
          <i className="bi bi-envelope text-2xl"></i>
          <span>Messagerie</span>
        </button>
        {/* {isChatboxVisible && <ChatBoxComponent toggleChatbox={toggleChatbox} />} */}
        {isChatboxVisible && <ChatBoxComponentDoctor patient={patient} toggleChatBox={toggleChatbox} listMessage={listMessage} setListMessage={setListMessage} pro={pro} setPro={setPro}/>}
      </div>
    </div>
  );
};

export default PatientData;