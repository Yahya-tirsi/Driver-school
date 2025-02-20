import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ClientApi from "../services/Api/Client/ClientApi";
import axiosClient from "../api/axios";
import { ContinuousColorLegend } from "@mui/x-charts";

const DrivingSchoolForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password : "",
    telephone: "",
    numeroIdentification: "",
    adresse: "",
    picture: null,
    front_picture_of_identity: null,
    back_picture_of_identity: null,
    permis_type_id : "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [permisTypes,setPermisTypes] = useState([]);
  useEffect(()=>{

    const getPermisTypes = async ()=> {
      const response = await ClientApi.getPermisTypes();
      setPermisTypes(response.data);
    }
    getPermisTypes();

  },[]);

  const  isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  const isEmailExist = async (email)=>{
    try{
      const { data } = await ClientApi.isEmailExist(email);
      return data.exists;
    }catch(err)
    {
      console.log(err.response.data.message);
    }
  }
  const isCinExist = async (cin)=>{
    try{
      const {  data } =await ClientApi.isCinExist(cin);

      return data.exists;
    }catch(err)
    {
      console.log(err.response.data.message);
    
    }
  }
  const validateStep =async  () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.nom.trim()) newErrors.nom = "Le nom est requis.";
      if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis.";
      if (!formData.email.trim()){
        newErrors.email = "L'e-mail est requis.";
      }else if(!isEmailValid(formData.email.trim())){
        newErrors.email = "Invalid email format.";
      }
      const isExist = await isEmailExist(formData.email.trim());
      if (isExist) {
        newErrors.email = "Cet e-mail existe déjà";
      }
      
      if (!formData.password.trim()) newErrors.password = "Password est requis.";
    } else if (step === 2) {
      if (!formData.telephone.trim())
        newErrors.telephone = "Le numéro de téléphone est requis.";
      if (!formData.numeroIdentification.trim())
      {
        newErrors.numeroIdentification =
        "Le numéro d'identification est requis.";
      }
      const isExist = await isCinExist(formData.numeroIdentification.trim());
      if (isExist) {
        newErrors.numeroIdentification = "Cet cin existe déjà";
      }

      if (!formData.adresse.trim())
        newErrors.adresse = "L'adresse est requise.";
    } else if (step === 3) {
      if (!formData.picture)
        newErrors.picture = "La photo personnelle est requise.";
      if (!formData.front_picture_of_identity)
        newErrors.front_picture_of_identity =
          "La photo de la face avant de la carte d'identité est requise.";
      if (!formData.back_picture_of_identity)
        newErrors.back_picture_of_identity =
          "La photo de la face arrière de la carte d'identité est requise.";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext =async () => {
    if (await validateStep()) {
      setStep((prevStep) => prevStep + 1);
      setErrors({});
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({ ...formData, [name]: files ? files[0] : value });
    setErrors({ ...errors, [name]: "" });
  };
const navigate=useNavigate();
  const handleSubmit = async () => {
    const bodyRequestFormatted = {
      cin : formData.numeroIdentification,
      firstname : formData.prenom,
      lastname : formData.nom,
      email : formData.email,
      password : formData.password,
      telephone : formData.telephone,
      address : formData.adresse,
      picture : formData.picture,
      front_picture_of_identity : formData.front_picture_of_identity,
      back_picture_of_identity : formData.back_picture_of_identity,
      permis_type_id : formData.permis_type_id
    }

    try {
      const response = await ClientApi.addNewClient(bodyRequestFormatted);
      navigate('/login');
    } catch (error) {
      
    }
  };

  const steps = [
    "Informations personnelles",
    "Continue votre information",
    "Détails fiscaux",
    "Résumé",
  ];

  
  return (
    <div className="form-container">
      <div className="steps-indicator">
        {steps.map((stepName, index) => (
          <div key={index} className="step-container">
            <div className={`step ${step >= index + 1 ? "active" : ""}`}>
              {index + 1}
            </div>
            <span>{stepName}</span>
            {index < steps.length - 1 && <div className="step-line"></div>}
          </div>
        ))}
      </div>

      <form className="form-reservation" method="POST" enctype="multipart/form-data">
        {step === 1 && (
          <div>
            <h2 className="title-reservation">
              <span>Étape 1 :</span> Informations personnelles
            </h2>
            <label>
              Nom :{" "}
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={errors.nom ? "input-error" : ""}
              />
              {errors.nom && (
                <span className="error-message">{errors.nom}</span>
              )}
            </label>
            <label>
              Prénom :{" "}
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={errors.prenom ? "input-error" : ""}
              />
              {errors.prenom && (
                <span className="error-message">{errors.prenom}</span>
              )}
            </label>
            <label>
              E-mail :{" "}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
                required
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </label>
            <label>
              Password :{" "}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
                required
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </label>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="title-reservation">
              <span>Étape 2 :</span> Continue votre information
            </h2>
            <label>
              Numéro de téléphone :{" "}
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className={errors.telephone ? "input-error" : ""}
              />
              {errors.telephone && (
                <span className="error-message">{errors.telephone}</span>
              )}
            </label>
            <label>
              Numéro d'identification :{" "}
              <input
                type="text"
                name="numeroIdentification"
                value={formData.numeroIdentification}
                onChange={handleChange}
                className={errors.numeroIdentification ? "input-error" : ""}
              />
              {errors.numeroIdentification && (
                <span className="error-message">
                  {errors.numeroIdentification}
                </span>
              )}
            </label>
            <label>
              Adresse :{" "}
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className={errors.adresse ? "input-error" : ""}
              />
              {errors.adresse && (
                <span className="error-message">{errors.adresse}</span>
              )}
            </label>
            <label>
              Type de permis:{" "}
              <select
                name="permis_type_id"
                onChange={handleChange}
                className={errors.permis_type_id ? "input-error" : ""}
              >
                <option selected disabled>Choisir un type de permis</option>
                {
                  permisTypes.map((type)=>  <option key={type.id} value={type.id}>{type.name === 'HAS'? 'A':type.name}</option>)
                }
              </select>
              {errors.permis_type_id && (
                <span className="error-message">{errors.permis_type_id}</span>
              )}
            </label>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="title-reservation">
              <span>Étape 3 :</span> Téléchargement des documents
            </h2>
            <label>
              Photo personnelle :{" "}
              <input
                type="file"
                name="picture"
                onChange={handleChange}
                accept="image/*"
                className={errors.picture ? "input-error" : ""}
              />
              {errors.picture && (
                <span className="error-message">{errors.picture}</span>
              )}
            </label>
            <label>
              Photo de la face avant de la carte d'identité nationale :{" "}
              <input
                type="file"
                name="front_picture_of_identity"
                onChange={handleChange}
                accept="image/*"
                className={
                  errors.front_picture_of_identity ? "input-error" : ""
                }
              />
              {errors.front_picture_of_identity && (
                <span className="error-message">
                  {errors.front_picture_of_identity}
                </span>
              )}              
            </label>
            <label>
              Photo de la face arrière de la carte d'identité nationale :{" "}
              <input
                type="file"
                name="back_picture_of_identity"
                onChange={handleChange}
                accept="image/*"
                className={
                  errors.back_picture_of_identity ? "input-error" : ""
                }
              />
              {errors.back_picture_of_identity && (
                <span className="error-message">
                  {errors.back_picture_of_identity}
                </span>
              )}
            </label>
          </div>
        )}

    {/* {step === 4 && (
          <div className="thanks-reservation">
            <h2 className="title-reservation">
              Merci pour votre réservation ! 🎉
            </h2>
            <p className="title-reservation">
              Votre demande a été prise en compte avec succès. Nous vous
              contacterons bientôt pour confirmer les détails de votre cours. Si
              vous avez des questions ou des modifications à apporter, n'hésitez
              pas à nous joindre au <span>+212799765432</span> ou par e-mail à
               <span><Link to="mailto:elmaaroufisaid@autoecole.com"> elmaaroufisaid@autoecole.com</Link>  </span>.
            </p>
            <p>
              Nous sommes impatients de vous accompagner sur la route de la
              réussite ! 🚗✨"
            </p>
          </div>
        )} */}

        <div className="navigation-buttons">
          {step > 1 && step < 4 && (
            <button type="button" onClick={handlePrevious}>
              Précédent
            </button>
          )}
          {step < 4 &&
            (step !== 3 ? (
              <button type="button" onClick={handleNext}>
                Suivant
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (validateStep()) {
                    handleSubmit();
                    handleNext();
                  }
                }}
              >
                Soumettre
              </button>
            ))}
        </div>
      </form>
    </div>
  );
};

export default DrivingSchoolForm;