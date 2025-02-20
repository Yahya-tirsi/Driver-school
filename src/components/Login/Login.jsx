import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import ClientApi from "../../services/Api/Client/ClientApi";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
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
            await ClientApi.getCsrfToken();
            const {data} = await ClientApi.login(formData.email,formData.password);
            localStorage.setItem('token',data.token);
            switch(data.user.role)
            {
                case 'client':
                    navigate('/Dashbordclient');
                    break;
                case 'admin':
                    navigate('/dashboard/statistiques');
                    break;
                default:
            }
        } catch (err) {
            if(err.status === 422)
            {
                setError('Invalid email or password');
            }
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
                value={formData.email}
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
                value={formData.password}
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

export default Login;