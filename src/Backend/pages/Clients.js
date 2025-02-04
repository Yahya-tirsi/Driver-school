import React, { useEffect, useState } from "react";
import "../styles.css";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormControl, MenuItem, Modal, Stack } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActionArea from "@mui/material/CardActionArea";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Clients = () => {
  const [confirmdelete, setconfirmdelete] = useState(false);
  const [modelUpdate, setmodelUpdate] = useState(false);
  const [modalPaiment, setmodalPaiment] = useState(false);
  const [clientName, setclientName] = useState("");
  const [permis, setpermis] = useState("Selectionner une catégorie");
  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
  });
  const [clients, setClients] = useState([]);
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [categorie, setcategorie] = useState("");
  const [telephone, settelephone] = useState("");
  const [adresse, setadresse] = useState("");
  const [prix, setprix] = useState();
  const [date, setdate] = useState("");
  const [id, setid] = useState("");
  const [openmodalajouter, setopenmodalajouter] = useState(false);
  const [allCatgegorie, setallCatgeorie] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function getClients() {
    axios
      .get("http://localhost:3004/client")
      .then((response) => {
        setClients(response.data);
        console.log(clients);
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

  let i = 0;
  const handleSubmit = async (eo) => {
    eo.preventDefault();
    try {
      await axios.post("http://localhost:3004/client", {
        firstName: nom,
        lastName: prenom,
        telephone: telephone,
        dateInscription: date,
        categorie: categorie,
        prix: prix,
        idPaiment: i + 1,
      });
      setOpen(!open);
      Swal.fire("Succès", "Client ajouté avec succès", "success");
      getClients();
    } catch (error) {
      console.error("Erreur lors de l'ajout du client", error);
    }

    await axios.post("http://localhost:3004/paiment", {
      idClient: i + 1,
      totalPaiment: prix,
      payerFois: [
        {
          date: date,
          prix: prix,
        },
      ],
    });
  };

  useEffect(() => {
    getClients();
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
          await axios.delete(`http://localhost:3004/client/${id}`);
          Swal.fire("Supprimé", "Le client a été supprimé.", "success");
          getClients();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
          Swal.fire("Erreur", "Impossible de supprimer le client.", "error");
        }
      }
    });
  };

  function handleUpdateClient(client) {
    setclientName(client.firstName);
    setnom(client.firstName);
    setprenom(client.lastName);
    setcategorie(client.categorie);
    settelephone(client.telephone);
    setprix(client.prix);
    setid(client.id);
    setmodelUpdate(!modelUpdate);
  }

  function handlePaiment(clientPaiment) {
    setclientName(clientPaiment.firstName);
    setmodalPaiment(!modalPaiment);
  }

  // Modifier client
  function handleUpdate(id) {
    axios.put(`http://localhost:3004/client/${id}`, {
      firstName: nom,
      lastName: prenom,
      telephone: telephone,
      dateInscription: date,
      categorie: categorie,
      prix: prix,
    });

    setmodelUpdate(false);
    getClients();
    Swal.fire("Modifier", "Le client a été modifier", "success");
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "Nom", width: 130 },
    { field: "lastName", headerName: "Prénom", width: 130 },
    { field: "telephone", headerName: "Téléphone", width: 100 },
    {
      field: "dateInscription",
      headerName: "Date d'inscription",
      type: "number",
      width: 130,
    },
    {
      field: "categorie",
      headerName: "Catégorie",
      width: 130,
    },
    {
      field: "prix",
      headerName: "Prix",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 210,
      renderCell: (params) => (
        <div className="container-btn-action-dashboard">
          {/* <button className="btn-view-dashboeard">
            <i class="fa-regular fa-eye"></i>
          </button> */}
          <button
            className="btn-modify-dashboeard"
            title="Modifier"
            onClick={() => handleUpdateClient(params.row)}
          >
            <i class="fa-solid fa-pen"></i>
          </button>
          {/* <button
            className="btn-mony-dashboeard"
            title="Paiments"
            onClick={() => handlePaiment(params.row)}
          >
            <i class="fa-solid fa-money-check-dollar"></i>
          </button> */}
          <button
            className="btn-sup-dashboeard"
            onClick={() => deleteClient(params.row.id)}
          >
            <DeleteIcon></DeleteIcon>
          </button>
        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="page">
      <div>
        <Box className="topClient">
          <h2 className="text-2xl font-semibold mb-4 h2-dashboard">
            Liste des Clients
          </h2>
          <button onClick={handleOpen} className="btnAjouter-client">
            Ajouter client
          </button>
        </Box>

        <div className="overflow-x-auto">
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={clients}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      </div>

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

      {modelUpdate && (
        <React.Fragment>
          <Dialog
            fullScreen
            open={modelUpdate}
            onClose={handleUpdateClient}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: "relative", backgroundColor: "black" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleUpdateClient}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Modification client : {clientName}
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => handleUpdate(id)}
                >
                  Sauvegarder
                </Button>
              </Toolbar>
            </AppBar>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "90%",
                  margin: "auto",
                  justifyContent: "center",
                },
                display: "flex",
                marginTop: "5rem",
                gap: 3,
                flexDirection: "column",
              }}
              noValidate
              autoComplete="off"
            >
              <Stack
                direction={"row"}
                sx={{
                  gap: 2,
                }}
              >
                <TextField
                  sx={{ flex: 1 }}
                  label="Nom"
                  value={nom}
                  onChange={(eo) => {
                    setnom(eo.target.value);
                  }}
                  variant="standard"
                />
                <TextField
                  sx={{ flex: 1 }}
                  label="Prénom"
                  value={prenom}
                  onChange={(eo) => {
                    setprenom(eo.target.value);
                  }}
                  variant="standard"
                />
              </Stack>
              <Stack
                direction={"row"}
                sx={{
                  gap: 2,
                }}
              >
                <TextField
                  sx={{ flex: 1 }}
                  label="Téléphone"
                  value={telephone}
                  variant="standard"
                  onChange={(eo) => {
                    settelephone(eo.target.value);
                  }}
                />
                <TextField
                  sx={{ flex: 1 }}
                  label="Prix"
                  variant="standard"
                  value={prix}
                  onChange={(eo) => {
                    setprix(eo.target.value);
                  }}
                />
              </Stack>
              <Stack
                direction={"row"}
                sx={{
                  gap: 2,
                }}
              >
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120, flex: 1 }}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Catégorie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    value={categorie}
                    onChange={(eo) => {
                      setcategorie(eo.target.value);
                    }}
                    label="Permis"
                  >
                    <MenuItem>
                      <em>Selectionner une catégorie</em>
                    </MenuItem>
                    {allCatgegorie.map((permis, index) => (
                      <MenuItem value={permis.letter}>
                        {permis.letter} - {permis.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <LocalizationProvider
                  sx={{ flex: 1 }}
                  dateAdapter={AdapterDayjs}
                >
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Date d'inscription" />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
            </Box>
          </Dialog>
        </React.Fragment>
      )}

      {/* Add client */}
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
            Ajouter un client
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom"
              name="firstName"
              fullWidth
              margin="dense"
              onChange={(eo) => setnom(eo.target.value)}
              required
            />
            <TextField
              label="Prénom"
              name="lastName"
              fullWidth
              margin="dense"
              onChange={(eo) => setprenom(eo.target.value)}
              required
            />
            <TextField
              label="Téléphone"
              name="telephone"
              fullWidth
              margin="dense"
              onChange={(eo) => settelephone(eo.target.value)}
              required
            />
            <TextField
              label="Date d'inscription"
              name="dateInscription"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              onChange={(eo) => setdate(eo.target.value)}
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
            <TextField
              label="Prix"
              name="prix"
              type="number"
              fullWidth
              margin="dense"
              onChange={(eo) => setprix(eo.target.value)}
              required
            />
            <button
              type="submit"
              variant="contained"
              className="btnAdd"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => handleSubmit}
            >
              Ajouter
            </button>
          </form>
        </Box>
      </Modal>

      {modalPaiment && (
        <React.Fragment>
          <Dialog
            fullScreen
            open={modalPaiment}
            onClose={handlePaiment}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handlePaiment}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Paiment client : {clientName}
                </Typography>
                <Button autoFocus color="inherit">
                  Sauvegarder
                </Button>
              </Toolbar>
            </AppBar>
            <Box className="content-aiment-dashbeard">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 1,
                    width: "90%",
                    margin: "auto",
                    justifyContent: "center",
                  },
                  display: "flex",
                  gap: 3,
                  flexDirection: "column",
                }}
                noValidate
                autoComplete="off"
                className="child-paiment-one"
              >
                <h2>Paiment:</h2>
                <Stack sx={{ gap: 3 }}>
                  <TextField
                    sx={{ flex: 1 }}
                    label="Paiment (DH)"
                    variant="standard"
                  />
                  <LocalizationProvider
                    sx={{ flex: 1 }}
                    dateAdapter={AdapterDayjs}
                  >
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker label="Date de paiment" />
                    </DemoContainer>
                  </LocalizationProvider>
                </Stack>
              </Box>
              <Box className="child-paiment-two">
                <Card>
                  <CardActionArea
                    sx={{
                      height: "100%",
                      "&[data-active]": {
                        backgroundColor: "action.selected",
                        "&:hover": {
                          backgroundColor: "action.selectedHover",
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ height: "100%" }}>
                      <Typography variant="h5" component="div">
                        Total paiment : 200DH
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", marginTop: "2rem" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        La date : 24/11/2004 | Le prix : 1500 DH
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", marginTop: "2rem" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        La date : 24/11/2004 | Le prix : 1500 DH
                      </Typography>
                      <Typography
                        sx={{ fontSize: "18px", marginTop: "2rem" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        La date : 24/11/2004 | Le prix : 1500 DH
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Box>
          </Dialog>
        </React.Fragment>
      )}
    </div>
  );
};

export default Clients;
