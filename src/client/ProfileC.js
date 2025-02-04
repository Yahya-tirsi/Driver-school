import React from 'react';

const ProfileC = () => {
    const client = {
        photo: 'https://i.pinimg.com/736x/c7/9a/37/c79a37e13ef14be556b51143bcbb1b01.jpg',
        nom: 'Dupont',
        prenom: 'Jean',
        telephone: '06 12 34 56 78',
    };
    return (
        <div style={styles.profileContainer}>
            <img src={client.photo} alt="Profile" style={styles.profileImage} />
            <h2 style={styles.name}>{client.nom} {client.prenom}</h2>
            <p style={styles.phone}>Téléphone: {client.telephone}</p>
        </div>
    );
};

const styles = {
    profileContainer: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'rgb(23, 23, 23)',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        width: '100%',
        height: '100vh',
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
};

export default ProfileC;
