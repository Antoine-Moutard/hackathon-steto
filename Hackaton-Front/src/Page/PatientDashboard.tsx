import BloodGlucoseMonitoring from "../Component/BloodMonitoringComponent";
import InsulinMonitoring from "../Component/InsulinMonitoringComponent";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import { Patient } from "../Interface/Patient";
import  ChatBoxComponent  from "../Component/ChatBoxComponent";
import { Message } from "../Interface/Message";
import NavBarLaterale from "../Component/NavBarLaterale";

type PatientProps = {
  userId: number | null;
  listPatients: Patient[],
  setListPatients: React.Dispatch<React.SetStateAction<Patient[]>>,
  patient: Patient,
  listMessage: Message[],
  setListMessage:React.Dispatch<React.SetStateAction<Message[]>>
};

const PatientDashboard = ({ patient,listMessage, setListMessage }: PatientProps) => {

  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  // const [listMessage, setListMessage] = useState<Message[]>([])

  const toggleChatbox = () => {
    setIsChatboxVisible(!isChatboxVisible);
    getListMessage()
    // console.log(listMessage)
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
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <NavBarLaterale />
        <div className="flex-1 flex flex-col space-y-6">
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
        </div>
      </div>
      <button
        onClick={toggleChatbox}
        className="fixed bottom-4 right-4 bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg flex space-x-2 text-xl"
      >
        <i className="bi bi-envelope text-xl"></i>
        <span>Messagerie</span>
      </button>
      {isChatboxVisible && <ChatBoxComponent patient={patient} toggleChatBox={toggleChatbox} listMessage={listMessage} setListMessage={setListMessage} />}    </div>
  );
};

export default PatientDashboard;
