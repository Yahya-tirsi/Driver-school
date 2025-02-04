import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../styles.css";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

const Moniteure = () => {
  const [open, setOpen] = React.useState(false);
  const [opendelete, setOpendelete] = useState(false);
  const [id, setid] = useState("");
  const [ajouter, setajouter] = useState(false);
  const [nom, setnom] = React.useState("");
  const [code, setcode] = React.useState("");
  const [moniteure, setMoniteure] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenajouter = () => setajouter(true);
  const handleCloseajouter = () => setajouter(false);

  // Get vehucule
  function getMoniteure() {
    axios
      .get("http://localhost:3004/moniteure")
      .then((response) => {
        setMoniteure(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Update moniteure
  function handleUpdate(id) {
    axios.put(`http://localhost:3004/moniteure/${id}`, {
      name: nom,
      code: code,
    });
    setOpen(false);
    getMoniteure();
    Swal.fire("Modifier", "Le moniteure a été modifier", "success");
  }

  // Add moniteure
  const handleSubmit = async (eo) => {
    eo.preventDefault();
    try {
      await axios.post("http://localhost:3004/moniteure", {
        name: nom,
        code: code,
      });
      setajouter(false);
      Swal.fire("Succès", "vehicules ajouté avec succès", "success");
      getMoniteure();
    } catch (error) {
      console.error("Erreur lors de l'ajout du vehicules", error);
    }
  };

  // Delete moniteure
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
          await axios.delete(`http://localhost:3004/moniteure/${id}`);
          Swal.fire("Supprimé", "Le moniteure a été supprimé.", "success");
          getMoniteure();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
          Swal.fire("Erreur", "Impossible de supprimer le moniteure.", "error");
        }
      }
    });
  };

  useEffect(() => {
    getMoniteure();
  });

  function handleSetinfo(user) {
    setOpen(true);
    setnom(user.name);
    setcode(user.code);
    setid(user.id);
  }
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
      <h2 className="h2-categories">Moniteures</h2>
      <div className="moniteure-cards">
        {moniteure.map((user) => (
          <div key={user.id} className="card-moniteure">
            <h3 className="title">Moniteure</h3>
            <p>
              <strong>Nom Prénom:</strong>
              <br></br> {user.name}
            </p>
            <p>
              <strong>Code:</strong>
              <br></br> {user.code}
            </p>

            {/* Edit & Delete Icons */}
            <div className="icon-group">
              <CreateIcon
                className="icon"
                onClick={() => handleSetinfo(user)}
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
              Modifier le moniteure
            </Typography>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            ></CloseIcon>
          </Box>
          <Box className="nom-code-moniteure">
            <TextField
              sx={{ width: "100%", marginBottom: "2rem" }}
              label="Nom"
              value={nom}
              variant="standard"
              onChange={(eo) => setnom(eo.target.value)}
            />
            <br></br>
            <TextField
              sx={{ width: "100%", marginBottom: "2rem" }}
              label="Code"
              value={code}
              variant="standard"
              onChange={(eo) => setcode(eo.target.value)}
            />
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

      {/* Add button */}
      <div className="add-icone-fixed-buttom" onClick={handleOpenajouter}>
        <AddIcon></AddIcon>
      </div>
      {/* Modal delete */}
      <Dialog
        open={opendelete}
        onClose={handleClosemodaldelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="title-sup">
          {"Supprimer moniteure : " + nom}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Es-tu sûr de vouloir supprimer cet monuteure ? ❌⚠️
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosemodaldelete}>Non</Button>
          <Button autoFocus>Oui</Button>
        </DialogActions>
      </Dialog>


      {/* Add moniteure */}
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
              label="Nom"
              name="nom"
              fullWidth
              margin="dense"
              onChange={(eo) => setnom(eo.target.value)}
              required
            />
            <TextField
              label="Code"
              name="code"
              fullWidth
              margin="dense"
              onChange={(eo) => setcode(eo.target.value)}
              required
            />
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

export default Moniteure;
