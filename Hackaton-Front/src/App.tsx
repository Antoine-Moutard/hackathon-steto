import { useState } from 'react';
import './App.css';
import { LoginPage } from './Component/LoginPage';
import PatientDashboard from "./PatientDashboard.tsx";

function App() {
  const [etat, setEtat] = useState<string>("login");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleUserSelect = (userId: number) => {
   setSelectedUserId(userId);
    setEtat("connect");
  };

  if (etat === "login") {
    return (
      <LoginPage etat={etat} setEtat={setEtat} onUserSelect={handleUserSelect} />
    );
  } else if (etat === "connect") {
    return (
      <div className='page-container'>
        <PatientDashboard userId={selectedUserId}  />
      </div>
    );
  }
  // ... Reste du composant ...
}

export default App;
