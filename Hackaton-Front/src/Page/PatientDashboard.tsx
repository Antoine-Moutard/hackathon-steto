import BloodGlucoseMonitoring from "../Component/BloodMonitoringComponent";
import InsulinMonitoring from "../Component/InsulinMonitoringComponent";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import { Patient } from "../Interface/Patient";
import  ChatBoxComponent  from "../Component/ChatBoxComponent";

type PatientProps = {
  userId: number | null;
  listPatients: Patient[];
  setListPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patient: Patient;
};

const PatientDashboard = ({ patient }: PatientProps) => {
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxVisible(!isChatboxVisible);
  };

  return (
    <div>
        <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div className="w-20 bg-yellow-100 text-center">
          <div className="">Logo de Steto si on le trouve</div>
          <button className="text-blue-950 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-people"
              viewBox="0 0 16 16"
            >
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
            </svg>
            
            <p>Patients</p>
          </button>
        </div>
        <div className="flex-1 flex flex-col space-y-6">
          <div className="ml-10 mt-10">
            <h1 className="text-2xl text-blue-950 font-bold">
              {patient.firstname} {patient.lastname}
            </h1>
            <div className="flex space-x-2 mt-2 text-gray-600 text-sm font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-clock"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
              </svg>
              <p>Dernère connexion : 5 jours</p>
            </div>
          </div>
          <BloodGlucoseMonitoring />
          <InsulinMonitoring />
        </div>
      </div>
      <button
        onClick={toggleChatbox}
        className="fixed bottom-4 right-4 bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg flex space-x-2"
      >
        <div className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-envelope"
            viewBox="0 0 16 16"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
          </svg>
        </div>
        <span>Messagerie</span>
      </button>
      {isChatboxVisible && <ChatBoxComponent patient={patient} toggleChatBox={toggleChatbox} />}
    </div>
    </div>
    
  );
};

export default PatientDashboard;
