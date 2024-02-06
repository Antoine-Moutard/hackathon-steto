import React, { useEffect, useState } from 'react';
import { Patient } from '../Interface/Patient';
import { Nurse } from '../Interface/Nurse';
import { Pro } from '../Interface/Pro';

type LoginPageProps = {
    setEtat: React.Dispatch<React.SetStateAction<string>>,
    onUserSelect: (userId: number) => void,
    listPatients: Patient[],
    setListPatients:React.Dispatch<React.SetStateAction<Patient[]>>,
    setPatient: React.Dispatch<React.SetStateAction<Patient>>
    setNurse: React.Dispatch<React.SetStateAction<Nurse>>
    setPro: React.Dispatch<React.SetStateAction<Pro>>
}

export const LoginPage = ({ setEtat, onUserSelect, setListPatients, listPatients, setPatient, setNurse, setPro }: LoginPageProps) => {

    // État pour stocker les données des patients
    const [listPros, setListPro] = useState<Pro[]>([]);
    const [listNurses, setListNurse] = useState<Nurse[]>([]);
    

    const handleNurseClick = (nurse: Nurse) => {
        onUserSelect(nurse.id);
        setNurse(nurse)
        let newEtat = "careteam";
        setEtat(newEtat);
    };

    const handlePatientClick = (newPatient: Patient) => {
        onUserSelect(newPatient.id);
        setPatient(newPatient)
        let newEtat = "connect";
        setEtat(newEtat);
    };

    const handleProClick = (newPro: Pro) => {
        onUserSelect(newPro.id);
        setPro(newPro)
        let newEtat = "careteam";
        setEtat(newEtat);
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
    }, []);
    

    useEffect(() => {
        // Fonction pour charger les données des patients
        const fetchPro = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getDoctors');
                const data: Pro[] = await response.json();
                setListPro(data);
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
                setListNurse(data);
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
                    {listPatients.map((patient, index) => (
                        <tr key={index} onClick={() => handlePatientClick(patient)}>
                            <td>{patient.firstname}</td>
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
                    {listPros.map((pro, index) => (
                        <tr key={index} onClick={() => handleProClick(pro)}>
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
                    {listNurses.map((nurse, index) => (
                        <tr key={index} onClick={() => handleNurseClick(nurse)}>
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