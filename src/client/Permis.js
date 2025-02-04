import React from 'react';
import { FaCar, FaMotorcycle, FaCalendarCheck, FaClock } from 'react-icons/fa';

const PermisC = () => {
    const permis = [
        { 
            type: 'Permis B', 
            status: 'Obtenu',
            date: '15/03/2022',
            progress: 100,
            category: 'Voiture'
        },
        { 
            type: 'Permis A2', 
            status: 'En cours',
            date: 'Prévu le 20/09/2024',
            progress: 30,
            category: 'Moto'
        },
        // Ajouter d'autres permis au besoin
    ];

    const upcomingExams = [
        {
            type: 'Code de la route',
            date: '25/08/2024',
            details: 'Examen théorique'
        }
    ];

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.mainTitle}>Mes Permis de Conduire</h1>
            
            <div style={styles.gridContainer}>
                {permis.map((permis, index) => (
                    <div key={index} style={styles.card}>
                        <div style={styles.cardHeader}>
                            {permis.category === 'Voiture' ? 
                                <FaCar style={styles.icon}/> : 
                                <FaMotorcycle style={styles.icon}/>}
                            <h3 style={styles.cardTitle}>{permis.type}</h3>
                        </div>
                        
                        <div style={styles.cardBody}>
                            <div style={styles.statusBadge(permis.status)}>
                                {permis.status}
                            </div>
                            <p style={styles.date}><FaCalendarCheck/> {permis.date}</p>
                            
                            {permis.status === 'En cours' && (
                                <div style={styles.progressContainer}>
                                    <div style={styles.progressBar(permis.progress)}>
                                        <span style={styles.progressText}>{permis.progress}%</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.examSection}>
                <h2 style={styles.sectionTitle}><FaClock/> Examens à venir</h2>
                {upcomingExams.map((exam, index) => (
                    <div key={index} style={styles.examCard}>
                        <h4>{exam.type}</h4>
                        <p>{exam.date}</p>
                        <p>{exam.details}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        padding: '30px',
        backgroundColor: '#1a1a1a',
        minHeight: '100vh',
        color: 'white'
    },
    mainTitle: {
        color: '#c3d900',
        textAlign: 'center',
        marginBottom: '40px'
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
    },
    card: {
        backgroundColor: '#2d2d2d',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s ease',
        ':hover': {
            transform: 'translateY(-5px)'
        }
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        borderBottom: '2px solid #c3d900',
        paddingBottom: '10px'
    },
    icon: {
        fontSize: '24px',
        marginRight: '10px',
        color: '#c3d900'
    },
    cardTitle: {
        margin: '0',
        fontSize: '1.5rem'
    },
    cardBody: {
        lineHeight: '1.6'
    },
    statusBadge: (status) => ({
        backgroundColor: status === 'Obtenu' ? '#4CAF50' : '#FFC107',
        color: 'black',
        padding: '5px 10px',
        borderRadius: '20px',
        display: 'inline-block',
        marginBottom: '10px',
        fontWeight: 'bold'
    }),
    date: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#cccccc'
    },
    progressContainer: {
        backgroundColor: '#404040',
        borderRadius: '10px',
        marginTop: '15px'
    },
    progressBar: (progress) => ({
        width: `${progress}%`,
        backgroundColor: '#c3d900',
        padding: '5px',
        borderRadius: '10px',
        transition: 'width 0.5s ease'
    }),
    progressText: {
        display: 'block',
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    },
    examSection: {
        backgroundColor: '#2d2d2d',
        padding: '20px',
        borderRadius: '15px'
    },
    sectionTitle: {
        color: '#c3d900',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    examCard: {
        backgroundColor: '#404040',
        padding: '15px',
        borderRadius: '10px',
        margin: '10px 0',
        '& h4': {
            margin: '0 0 8px 0',
            color: '#c3d900'
        }
    }
};

export default PermisC;