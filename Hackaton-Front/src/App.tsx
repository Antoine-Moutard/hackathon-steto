import { useState } from "react";
import { LoginPage } from "./Page/LoginPage.tsx";
import PatientDashboard from "./Page/PatientDashboard.tsx";
import { Patient } from "./Interface/Patient.tsx";
import { Nurse } from "./Interface/Nurse.tsx";
import { Pro } from "./Interface/Pro.tsx";
import { DoctorDashboard } from "./Page/DoctorDashboard.tsx";

function App() {
  const [etat, setEtat] = useState<string>("login");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [listPatients, setListPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>({
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
  });
  const [nurse, setNurse] = useState<Nurse>({
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
    role: "",
  });
  const [pro, setPro] = useState<Pro>({
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
    role: "",
  });

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    setEtat("connect");
  };

  if (etat === "login") {
    return (
      <LoginPage
        setEtat={setEtat}
        onUserSelect={handleUserSelect}
        listPatients={listPatients}
        setListPatients={setListPatients}
        setPatient={setPatient}
        setNurse={setNurse}
        setPro={setPro}
      />
    );
  } else if (etat === "connect") {
    return (
      <div className="page-container">
        <PatientDashboard
          userId={selectedUserId}
          listPatients={listPatients}
          setListPatients={setListPatients}
          patient={patient}
        />
      </div>
    );
  } else if (etat === "careteam") {
    return (
      <div className="page-container">
        <DoctorDashboard />
      </div>
    );
  }
  // ... Reste du composant ...
}

export default App;
