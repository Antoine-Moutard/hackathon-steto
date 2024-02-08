import { useState } from 'react';
import "tailwindcss/tailwind.css";
import { Patient } from "../Interface/Patient";
import NavBarLaterale from '../Component/NavBarLaterale';
import PatientData from "../Component/PatientData.tsx";
import { Message } from '../Interface/Message.tsx';
import { Pro } from '../Interface/Pro.tsx';

type DoctorDashboardProps = {
  listPatients: Patient[];
  listMessage: Message[],
  setListMessage:React.Dispatch<React.SetStateAction<Message[]>>
  pro: Pro,
  setPro:React.Dispatch<React.SetStateAction<Pro>>
};

export const DoctorDashboard = ({ listPatients, listMessage,setListMessage, pro, setPro }: DoctorDashboardProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  return (
      <div className="flex flex-col h-screen">
        <div className="flex flex-grow">
          <NavBarLaterale />
          <div className="flex-1 overflow-y-auto">
            {!selectedPatient ? (
                <div>
                  {listPatients.map(patient => (
                      <div key={patient.id} className="cursor-pointer p-4 hover:bg-gray-100" onClick={() => setSelectedPatient(patient)}>
                      {patient.firstname} {patient.lastname}
                    </div>
                  ))}
                </div>
            ) : (
                <PatientData patient={selectedPatient} onBack={() => setSelectedPatient(null)} listMessage={listMessage} setListMessage={setListMessage} pro={pro} setPro={setPro}/>
            )}
          </div>
        </div>
      </div>
  );
};

export default DoctorDashboard;