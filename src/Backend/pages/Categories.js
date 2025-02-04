import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Grid2,
  Button,
  TextField,
  MenuItem,
  Select,
  Typography,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const CategoryList = () => {
  const [allCatgegorie, setallCatgeorie] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [nom, setnom] = useState("");
  const [description, setdescription] = useState("");
  const [confirmdelete, setconfirmdelete] = useState(false);
  const [prix, setprix] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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


  const handleSubmit = async (eo) => {
    eo.preventDefault();
    await axios.post("http://localhost:3004/categories", {
      description: description,
      name: nom,
      price: prix,
    });
    setOpen(!open);
    Swal.fire("Succès", "Client ajouté avec succès", "success");
    getCategorie();
  };

  useEffect(() => {
    getCategorie();
  });

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
          await axios.delete(`http://localhost:3004/categories/${id}`);
          Swal.fire("Supprimé", "Le vehicules a été supprimé.", "success");
          getCategorie();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
          Swal.fire("Erreur", "Impossible de supprimer le vehicules.", "error");
        }
      }
    });
  };


  return (
    <Box sx={{ flexGrow: 7, padding: 4 }}>
      <Box className="topClient">
        <h2 className="text-2xl font-semibold mb-4 h2-dashboard">Categories</h2>
        <button onClick={handleOpen} className="btnAjouter-client">
          Ajouter categories
        </button>
      </Box>
      <Grid2 container spacing={2} justifyContent="center">
        {allCatgegorie.map((category) => (
          <Grid2 sx={{ width: "100%" }} key={category.id}>
            <Card sx={{ width: "100%" }}>
              <CardHeader
                avatar={<Avatar aria-label="recipe">{category.letter}</Avatar>}
                action={
                  <IconButton aria-label="settings">
                    <DeleteRoundedIcon title="Delete categorie" className="trush-icone" onClick={() => deleteClient(category.id)}/>
                  </IconButton>
                }
                title={category.description}
                subheader={`Prix: ${category.price} DH`}
              />
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Modal
        open={open}
        onClose={handleClose}
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
            Ajouter un categories
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
              label="Description"
              name="description"
              fullWidth
              margin="dense"
              onChange={(eo) => setdescription(eo.target.value)}
              required
            />
            <TextField
              label="prix"
              name="prix"
              fullWidth
              margin="dense"
              onChange={(eo) => setprix(eo.target.value)}
              required
            />
            <button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => handleSubmit}
              className="btnAdd"
            >
              Ajouter
            </button>
          </form>
        </Box>
      </Modal>

      {confirmdelete &&
        Swal.fire({
          title: "Es-tu sûr?",
          text: "Vous êtes sûr de vouloir supprimer le client?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#c3d900",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui, Supprimer",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Supprimé!",
              text: "Votre client a été supprimé.",
              icon: "success",
            });
          }
        })}
    </Box>
  );
};

export default CategoryList;
