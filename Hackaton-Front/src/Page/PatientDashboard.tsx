import BloodGlucoseMonitoring from '../Component/BloodMonitoringComponent';
import InsulinMonitoring from '../Component/InsulinMonitoringComponent';
import ChatBox from '../Component/ChatBoxComponent';
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from "react";
import { Patient } from '../Interface/Patient';

type PatientProps = {
    userId: number | null;
    listPatients: Patient[],
    setListPatients:React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientDashboard = ({ userId, setListPatients }: PatientProps) => {
    const [isChatboxVisible, setIsChatboxVisible] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);


    const toggleChatbox = () => {
        setIsChatboxVisible(!isChatboxVisible);
        setIsButtonClicked(!isButtonClicked);
    };

    useEffect(() => {
        // Fonction pour charger les données des patients
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getPatients');
                const data: Patient[] = await response.json();
                setListPatients(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des patients :", error);
            }
        };
    
        fetchPatients();
    }, [])

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-grow">
                <div className={`w-16 h-16 bg-blue-500 ${isButtonClicked ? 'bg-dark-blue' : ''}`}>
                    {/* Logo or any other content you want to display */}
                </div>
                <div className="flex-1 flex flex-col space-y-6">
                    <div><p> {userId}</p></div>
                    <BloodGlucoseMonitoring />
                    <InsulinMonitoring />
                </div>
            </div>
            <button
                onClick={toggleChatbox}
                className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
            >
                <div className="w-8 h-8 bg-white rounded-full">
                    {/* Logo or any other content you want to display */}
                </div>
                <span>Chat</span>
            </button>
            {isChatboxVisible && <ChatBox />} {/* Affichez la chatbox si isChatboxVisible est vrai */}
        </div>
    );
};

export default PatientDashboard;
