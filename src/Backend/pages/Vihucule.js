import { Box, styled, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { purple } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import "../styles.css";
import axios from "axios";
import Swal from "sweetalert2";

const Vihucule = () => {
  const [open, setOpen] = React.useState(false);
  const [ajouter, setajouter] = useState(false);
  const [opendelete, setOpendelete] = useState(false);
  const [matricule, setmatricule] = useState("");
  const [categorie, setcategorie] = useState("");
  const [id, setid] = useState("");
  const [vehucule, setVehucule] = useState([]);
  const [allCatgegorie, setallCatgeorie] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenajouter = () => setajouter(true);
  const handleCloseajouter = () => setajouter(false);


  function handleOpenUpdate(user) {
    setOpen(true);
    setmatricule(user.matricule);
    setcategorie(user.categorie);
    setid(user.id);
  }

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    try {
      await axios.post("http://localhost:3004/vehicules", {
        matricule: matricule,
        categorie: categorie,
      });
      setajouter(false);
      Swal.fire("Succès", "vehicules ajouté avec succès", "success");
      getVehucule();
    } catch (error) {
      console.error("Erreur lors de l'ajout du vehicules", error);
    }
  };

  function handleUpdate(id) {
    axios.put(`http://localhost:3004/vehicules/${id}`, {
      matricule: matricule,
      categorie: categorie,
    });
    setOpen(!open);
    getVehucule();
    Swal.fire("Modifier", "Le vehicules a été modifier", "success");
  }
  // Get vehucule
  function getVehucule() {
    axios
      .get("http://localhost:3004/vehicules")
      .then((response) => {
        setVehucule(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // get categorie
  function getCategorie() {
    axios
      .get("http://localhost:3004/categories")
      .then((response) => {
        setallCatgeorie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const deleteClient = async (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3004/vehicules/${id}`);
          Swal.fire("Supprimé", "Le vehicules a été supprimé.", "success");
          getVehucule();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
          Swal.fire("Erreur", "Impossible de supprimer le vehicules.", "error");
        }
      }
    });
  };

  useEffect(() => {
    getVehucule();
    getCategorie();
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClosemodaldelete = () => {
    setOpendelete(false);
  };

  return (
    <Box component="form" sx={{ flexGrow: 7, padding: 4 }} autoComplete="off">
      <h2 className="h2-categories">Véhicule</h2>
      <div className="moniteure-cards">
        {vehucule.map((user) => (
          <div key={user.id} className="card-moniteure">
            <h3 className="title">Véhicule</h3>
            <p>
              <strong>Matricule:</strong>
              <br></br> {user.matricule}
            </p>
            <p>
              <strong>Categorie:</strong>
              <br></br> {user.categorie}
            </p>

            {/* Edit & Delete Icons */}
            <div className="icon-group">
              <CreateIcon
                className="icon"
                onClick={() => handleOpenUpdate(user)}
              ></CreateIcon>

              {/* Tooltip + Delete Button */}
              <div className="tooltip-container">
                <CloseIcon
                  className="icon delete"
                  sx={{ cursor: "pointer" }}
                  onClick={() => deleteClient(user.id)}
                ></CloseIcon>
                <span className="tooltip-text">Supprimer</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1rem" }}
            >
              Modifier la véhicule
            </Typography>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            ></CloseIcon>
          </Box>
          <Box className="nom-code-moniteure">
            <TextField
              sx={{ width: "100%", marginBottom: "2rem" }}
              label="Matricule"
              value={matricule}
              variant="standard"
              onChange={(eo) => setmatricule(eo.target.value)}
            />
            <br></br>
            <InputLabel id="demo-simple-select-standard-label">
              Categorie
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              sx={{ width: "100%", marginBottom: "2rem" }}
              value={categorie}
              onChange={(eo) => setcategorie(eo.target.value)}
              label="Categorie"
            >
              <MenuItem value="">
                <em>Selecter la categorie</em>
              </MenuItem>
              {allCatgegorie.map((item) => (
                <MenuItem value={item.letter}>{item.letter}</MenuItem>
              ))}
            </Select>
          </Box>
          <button
            className="btnAdd"
            variant="contained"
            onClick={() => handleUpdate(id)}
          >
            Modifier
          </button>
        </Box>
      </Modal>

      {/* Modal delete */}
      <Dialog
        open={opendelete}
        onClose={handleClosemodaldelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="title-sup">
          {"Véhicule matricule : " + matricule}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Es-tu sûr de vouloir supprimer cet véhicule ? ❌⚠️
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosemodaldelete}>Non</Button>
          <Button autoFocus>Oui</Button>
        </DialogActions>
      </Dialog>

      <div className="add-icone-fixed-buttom" onClick={handleOpenajouter}>
        <AddIcon></AddIcon>
      </div>


      <Modal
        open={ajouter}
        onClose={handleCloseajouter}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Ajouter un vehicules
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Matricule"
              name="matricule"
              fullWidth
              margin="dense"
              onChange={(eo) => setmatricule(eo.target.value)}
              required
            />
           
            <Select
              name="categorie"
              fullWidth
              margin="dense"
              onChange={(eo) => setcategorie(eo.target.value)}
              required
              displayEmpty
            >
              <MenuItem value="" disabled>
                Choisir une catégorie
              </MenuItem>
              {allCatgegorie.map((permis, index) => (
                <MenuItem value={permis.letter}>
                  {permis.letter} - {permis.description}
                </MenuItem>
              ))}
            </Select>
            <button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              className="btnAdd"
            >
              Ajouter
            </button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Vihucule;
