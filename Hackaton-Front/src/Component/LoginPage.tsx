import React, { useEffect, useState } from 'react';

type LoginPageProps = {
    etat: string,
    setEtat: React.Dispatch<React.SetStateAction<string>>,
    onUserSelect: (userId: number) => void
}

export const LoginPage = ({ setEtat, onUserSelect }: LoginPageProps) => {
    // État pour stocker les données des patients
    const [patients, setPatient] = useState<Patient[]>([]);
    const [pros, setPro] = useState<Pro[]>([]);
    const [nurses, setNurse] = useState<Nurse[]>([]);
    

    const handleUserClick = (userId: number) => {
        onUserSelect(userId);
        let newEtat = "connect";
        setEtat(newEtat);
    };

    interface Patient {
        id: number;
        lastname: string;
        firstname: string;
        email: string;
      }

      interface Pro {
        id: number;
        lastname: string;
        firstname: string;
        email: string;
        role: string;
      }

      interface Nurse {
        id: number;
        lastname: string;
        firstname: string;
        email: string;
        role: string;
      }

      useEffect(() => {
        // Fonction pour charger les données des patients
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getPatients');
                const data: Patient[] = await response.json();
                setPatient(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des patients :", error);
            }
        };
    
        fetchPatients();
    }, []);
    

    useEffect(() => {
        // Fonction pour charger les données des patients
        const fetchPro = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getDoctors');
                const data: Pro[] = await response.json();
                setPro(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des docteurs :", error);
            }
        };

        fetchPro();
    }, []);


    useEffect(() => {
        // Fonction pour charger les données des patients
        const fetchNurse = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getNurses');
                const data: Nurse[] = await response.json();
                setNurse(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des nurses :", error);
            }
        };

        fetchNurse();
    }, []);


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Prénom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={index} onClick={() => handleUserClick(patient.id)}>
                            <td>{patient.lastname}</td>
                            <td>{patient.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Prénom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Metier</th>
                    </tr>
                </thead>
                <tbody>
                    {pros.map((pro, index) => (
                        <tr key={index} onClick={() => handleUserClick(pro.id)}>
                        <th scope="row">{pro.firstname}</th>
                            <td>{pro.lastname}</td>
                            <td>{pro.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Prénom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Metier</th>
                    </tr>
                </thead>
                <tbody>
                    {nurses.map((nurse, index) => (
                        <tr key={index} onClick={() => handleUserClick(nurse.id)}>
                        <th scope="row">{nurse.firstname}</th>
                            <td>{nurse.lastname}</td>
                            <td>{nurse.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}