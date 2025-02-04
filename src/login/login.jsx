import React, { useState } from "react";
import axios from "axios";
import "./style.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Récupérer la liste des utilisateurs
            const response = await axios.get('http://localhost:3004/client');
            const users = response.data;

            // Vérifier les identifiants
            const user = users.find(user => 
                user.email === data.email && user.password === data.password
            );

            if(user) {
                setSuccess('Connexion réussie !');
                // Redirection ou gestion de l'état d'authentification ici
                if(user.role == "super"){
                    navigate('/dashboard')
                }
                    if(user.role == "client"){
                        navigate('/Dashbordclient')
                    }
                    if(user.role == "admin"){
                        navigate('/Dashbordadmine')
                    }
                    if(user.role == "moniteur"){
                        navigate('/Dashbordmoniteur')
                    }
            } else {
                setError('Email ou mot de passe incorrect');
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
<div className="login-page">
    <div className="login-container">
        <h1 className="login-title">Connexion</h1>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="email">Adresse email</label>
            <input
                className="input-field"
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Entrez votre email"
                required
            />
            
            <label className="form-label" htmlFor="password">Mot de passe</label>
            <input
                className="input-field"
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                required
            />
            
            {/* <a className="forgot-password" href="/forgot-password">Mot de passe oublié ?</a> */}
            <button className="login-button" type="submit" disabled={loading}>
                {loading ? 'Chargement...' : 'Se connecter'}
            </button>
        </form>
    </div>

    <footer className="login-footer">
        <div className="social-icons-container">
            <a className="social-icon" href="#"><i className="fab fa-facebook"></i></a>
            <a className="social-icon" href="#"><i className="fab fa-instagram"></i></a>
            <a className="social-icon" href="#"><i className="fab fa-twitter"></i></a>
            <a className="social-icon" href="#"><i className="fab fa-whatsapp"></i></a>
        </div>
    </footer>
</div>
    );
};

export default LoginPage;