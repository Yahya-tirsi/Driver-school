import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { FaMoneyCheckAlt, FaCreditCard, FaWallet, FaCalendarAlt, FaCoins } from 'react-icons/fa';

const settings = {
    width: 200,
    height: 200,
    value: 35,
    valueMax: 50
};

const PaymentsC = () => {
    const payments = [
        { date: '2023-10-01', montant: 500, methode: 'Carte de crédit' },
        { date: '2023-09-15', montant: 300, methode: 'Virement bancaire' },
        { date: '2023-08-20', montant: 200, methode: 'Espèces' },
        // ... autres paiements
    ];

    const totalPay = payments.reduce((sum, payment) => sum + payment.montant, 0);

    const getPaymentIcon = (method) => {
        switch(method) {
            case 'Carte de crédit': return <FaCreditCard style={styles.methodIcon}/>;
            case 'Virement bancaire': return <FaMoneyCheckAlt style={styles.methodIcon}/>;
            case 'Espèces': return <FaCoins style={styles.methodIcon}/>;
            default: return <FaWallet style={styles.methodIcon}/>;
        }
    };

    return (
        <div style={styles.paymentsContainer}>
            <div style={styles.header}>
                <h2 style={styles.mainTitle}>Gestion des Paiements <FaWallet/></h2>
                <div style={styles.gaugesContainer}>
                    <Gauge
                        {...settings}
                        sx={(theme) => ({
                            [`& .${gaugeClasses.valueText}`]: { fontSize: 40, fill: '#c3d900' },
                            [`& .${gaugeClasses.valueArc}`]: { fill: '#c3d900' },
                            [`& .${gaugeClasses.referenceArc}`]: { fill: '#2d2d2d' },
                        })}
                    />
                    <div style={styles.totalBox}>
                        <div style={styles.totalContent}>
                            <FaMoneyCheckAlt style={styles.totalIcon}/>
                            <p style={styles.total}>Total payé<br/><span style={styles.totalAmount}>{totalPay} Dh</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 style={styles.sectionTitle}><FaCalendarAlt/> Historique des Paiements</h3>
            <div style={styles.paymentGrid}>
                {payments.map((payment, index) => (
                    <div key={index} style={styles.paymentCard}>
                        <div style={styles.cardHeader}>
                            {getPaymentIcon(payment.methode)}
                            <div>
                                <p style={styles.paymentDate}>{payment.date}</p>
                                <p style={styles.paymentMethod}>{payment.methode}</p>
                            </div>
                        </div>
                        <p style={styles.paymentAmount}>{payment.montant} Dh</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    MuiGaugevalueText : {

    },
    paymentsContainer: {
        padding: '2rem',
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        color: 'white',
        width: '90%',
        margin: '2rem auto',
        position: 'relative'
    },
    header: {
        marginBottom: '2rem',
        textAlign: 'center'
    },
    mainTitle: {
        color: '#c3d900',
        fontSize: '2rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
    },
    gaugesContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
        margin: '2rem 0'
    },
    totalBox: {
        backgroundColor: '#2d2d2d',
        padding: '1.5rem',
        borderRadius: '12px',
        minWidth: '250px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    },
    totalContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    totalIcon: {
        fontSize: '2.5rem',
        color: '#c3d900'
    },
    total: {
        fontSize: '1.1rem',
        margin: 0,
        color: '#aaa'
    },
    totalAmount: {
        fontSize: '2rem',
        color: '#c3d900',
        fontWeight: 'bold'
    },
    sectionTitle: {
        color: '#c3d900',
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem'
    },
    paymentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
    },
    paymentCard: {
        backgroundColor: '#2d2d2d',
        borderRadius: '10px',
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'transform 0.3s ease',
        ':hover': {
            transform: 'translateY(-3px)'
        }
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    methodIcon: {
        fontSize: '1.8rem',
        color: '#c3d900'
    },
    paymentDate: {
        margin: 0,
        fontSize: '0.9rem',
        color: '#888'
    },
    paymentMethod: {
        margin: 0,
        fontWeight: 'bold'
    },
    paymentAmount: {
        margin: 0,
        fontSize: '1.4rem',
        fontWeight: 'bold',
        color: '#c3d900'
    }
};

export default PaymentsC;