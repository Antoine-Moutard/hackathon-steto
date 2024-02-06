import { useState } from 'react';
import './App.css';
import { LoginPage } from './Page/LoginPage.tsx';
import PatientDashboard from "./Page/PatientDashboard.tsx";
import { Patient } from './Interface/Patient.tsx';

function App() {
  const [etat, setEtat] = useState<string>("login");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [listPatients, setListPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>({id: 0, email:"" , firstname: "", lastname:""});

  const handleUserSelect = (userId: number) => {
   setSelectedUserId(userId);
    setEtat("connect");
  };

  if (etat === "login") {
    return (
      <LoginPage setEtat={setEtat} onUserSelect={handleUserSelect} listPatients={listPatients} setListPatients={setListPatients} setPatient={setPatient}/>
    );
  } else if (etat === "connect") {
    return (
      <div className='page-container'>
        <PatientDashboard userId={selectedUserId} listPatients={listPatients} setListPatients={setListPatients}/>
      </div>
    );
  }
  // ... Reste du composant ...
}

export default App;
