import React from 'react';
import Profile from './ProfileC';
import Payments from './Payments';
import Permis from './Permis';

import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
    const settings = {
        width: 600,
        height: 500,
        value: 60,
    };
const DashboardC = () => {
    const client = {
        photo: 'https://i.pinimg.com/736x/c7/9a/37/c79a37e13ef14be556b51143bcbb1b01.jpg',
        nom: 'Dupont',
        prenom: 'Jean',
        telephone: '06 12 34 56 78',
    };

    const payments = [
        { date: '2023-10-01', montant: 500, methode: 'Carte de crédit' },
        { date: '2023-09-15', montant: 300, methode: 'Virement bancaire' },
        { date: '2023-08-20', montant: 200, methode: 'Espèces' },
        { date: '2023-10-01', montant: 500, methode: 'Carte de crédit' },
        { date: '2023-09-15', montant: 300, methode: 'Virement bancaire' },
        { date: '2023-08-20', montant: 200, methode: 'Espèces' },
        { date: '2023-10-01', montant: 500, methode: 'Carte de crédit' },
        { date: '2023-09-15', montant: 300, methode: 'Virement bancaire' },
        { date: '2023-08-20', montant: 200, methode: 'Espèces' },
    ];

    const permis = ['Permis B', 'Permis A2'];
    
    const videos = [
        { title: 'Manoeuvres de stationnement', url: 'https://www.youtube.com/watch?v=stationnement' },
        { title: 'Conduite en ville', url: 'https://www.youtube.com/watch?v=conduite' },
        { title: 'Code de la route', url: 'https://www.youtube.com/watch?v=code' },
    ];

    const totalPay = payments.reduce((sum, payment) => sum + payment.montant, 0);

    return (
        <>
        
        <div style={styles.dashboard}>
            <div style={styles.paymentsContainer}>
            <Gauge
                {...settings}
                cornerRadius="50%"
                sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 90,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#c3d900',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: theme.palette.text.disabled,
                    },
                })}
            />

            <p style={styles.total}>Total payé: <strong>{totalPay} Dh</strong></p>
            
            <button style={styles.paymentsTitle}><h4 >Historique des Paiements</h4></button>
        </div>
            <div style={styles.profileContainer}>
            <img src={client.photo} alt="Profile" style={styles.profileImage} />
            <h2 style={styles.name}>{client.nom} {client.prenom}</h2>
            <p style={styles.phone}>Téléphone: {client.telephone}</p>
        </div>

        <h3 style={styles.title}>Permis Obtenus</h3>
            <ul style={styles.list}>
                {permis.map((type, index) => (
                    <li key={index} style={styles.item}>{type}</li>
                ))}
            </ul>
        </div>        
        </>            
    );
};

export default DashboardC;

const styles = {
    dashboard: {
        display:"flex",
        maxWidth: '1800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        height: '900px',
    },
    title: {
        fontSize: '2rem',
        color: '#c3d900',
        textAlign: 'center',
        marginBottom: '20px',
    },
    profileContainer: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'rgba(79, 79, 79, 0.5)',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        width: '400px',
        height: '400px',
        position: "absolute",
        right:"20px"
    },
    profileImage: {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    name: {
        fontSize: '1.5rem',
        color: '#c3d900',
    },
    phone: {
        fontSize: '1rem',
        color: 'rgba(255, 255, 255)',
    },
    paymentsContainer: {
        padding: '20px',
        backgroundColor: 'rgba(79, 79, 79, 0.5)',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        color: 'rgba(255, 255, 255)',
        width: '600px',
        textAlign: 'center',
        position: "absolute",
        right:"500px"

    },
    paymentsTitle: {
        fontSize: '1rem',
        color: 'rgba(255, 255, 255)',
        backgroundColor: '#c3d900',
        borderRadius: '10px',
        border: '1px solid rgb(255, 255, 255)',
        marginBottom: '0px', // Corrected typo here
    },
    paymentsList: {
        listStyle: 'none',
        padding: '0',
    },
    paymentItem: {
        padding: '10px',
        border: '1px solid #c3d900',
        marginBottom: '40px',
        borderRadius: '10px',
    },
    total: {
        fontSize: '1.2rem',
        marginTop: '10px',
        color: 'rgba(255, 255, 255)',
    },
    container: {
        padding: '20px',
        backgroundColor: 'rgba(79, 79, 79, 0.5)',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        color: 'rgba(255, 255, 255)',
        width: '400px',
        position: "absolute",
        right:"20px",
        top: "490px"
    },
    title: {
        fontSize: '1.25rem',
        color: '#c3d900',
    },
    list: {
        listStyle: 'none',
        padding: '0',
    },
    item: {
        fontSize: '1rem',
        padding: '5px 0',
    },
};

