import { useState } from 'react';
import './App.css';
import { MainPage } from './Component/MainPage';
import { ChatBox } from './Component/ChatBox';
import { LoginPage } from './Component/LoginPage';

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
        <MainPage userId={selectedUserId} />
        <ChatBox />
      </div>
    );
  }
  // ... Reste du composant ...
}

export default App;
