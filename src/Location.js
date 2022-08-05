import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Dialog,
    DialogContent,
    TextField,
    Stack,
    DialogTitle,
  } from "@mui/material";
  import React, { useState } from "react";
  import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
  import DeleteIcon from "@mui/icons-material/Delete";
  import AddIcon from "@mui/icons-material/Add";
  
  function Location() {
    const [open, setOpen] = React.useState(false);
    const [arr, setArr] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [count, setCount] = useState(0);
  
    const [value, setValues] = useState({
      username: "",
    });
  
    const [editValue, setEditValues] = useState({
      id: "",
      username: "",
    });
  
    const handleChange = (event) => {
      setValues({
        ...value,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleEditChange = (event) => {
      setEditValues({
        ...editValue,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleAddButton = (e) => {
      e.preventDefault();
  
      if (value.username) {
        let temp = [...arr];
        let obj = {
          id: count,
          username: value.username,
        };
  
        temp.push(obj);
        setCount(count + 1);
        setArr(temp);
        setValues({
          username: "",
        });
        setOpen(false);
      } else {
        alert("Please enter your Hometown");
      }
    };
  
    const sortingValue = (a, b) => {
      return a.id - b.id;
    };
  
    const handleDelete = (todo) => {
      let temp = [...arr];
      let index = temp.findIndex((x) => x.id === todo.id);
      temp.splice(index, 1);
      setArr(temp);
    };
  
    const handleView = (todo) => {
      setEditValues({ ...todo });
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handleUpdate = (e) => {
      e.preventDefault();
      if (editValue.username) {
        let temp = [...arr];
        let obj = {
          id: editValue.id,
          username: editValue.username,
        };
        let index = temp.findIndex((a) => a.id === editValue.id);
        temp.splice(index, 1);
        temp.push(obj);
        setArr(temp);
        setOpenDialog(false);
      } else {
        alert("Please Enter location");
      }
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <Grid
          container
          xs={12}
          md={12}
          xl={12}
          sm={12}
          sx={{
            backgroundImage: "linear-gradient(to bottom right,#a6a5fa,#e6e6f5)",
            minHeight: "100vh",
          }}
        >
          <Grid container xs={12} md={12} sm={12} xl={12} mt={3}>
            <Grid item xs={6} md={10} sm={10} display="flex" flexDirection="row">
              {/* //nothing here */}
            </Grid>
            <Grid item xs={6} md={2} sm={2} mt={0}>
              <Button
                sx={{
                  borderRadius: "0px",
                }}
                variant="contained"
                endIcon={<AddIcon color="secondary" />}
                onClick={handleClickOpen}
              >
                <Typography
                  component="p"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  Add your hometown
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container xs={12} md={12} sm={12} xl={12}>
            <TableContainer
              component={Paper}
              sx={{
                marginBottom: "10%",
                marginLeft: "10%",
                marginRight: "10%",
                marginTop: "3%",
                padding: "1%",
              }}
            >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">LOCATION</TableCell>
  
                    <TableCell align="center">EDIT</TableCell>
  
                    <TableCell align="center">DELETE</TableCell>
                  </TableRow>
                </TableHead>
  
                {arr.length === 0 && (
                  <Typography textAlign="center">No Locations</Typography>
                )}
                {arr.sort(sortingValue).map((todo) => (
                  <TableBody>
                    <TableRow key={todo.id}>
                      <TableCell align="center">{todo.username}</TableCell>
  
                      <TableCell align="center">
                        {todo.EDIT}
                        <IconButton onClick={() => handleView(todo)}>
                          <ModeEditOutlineIcon />
                        </IconButton>
                      </TableCell>
  
                      <TableCell align="center">
                        {todo.DELETE}
                        <IconButton onClick={handleDelete}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          </Grid>
  
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            sx={{
              height: "100vh",
              width: "100%",
            }}
          >
            <Typography
              variant="div"
              component={DialogContent}
              sx={{
                height: "100vh",
                width: "100%",
              }}
            >
              <DialogTitle>
                <center>Adding New Location</center>
              </DialogTitle>
              <form onSubmit={handleAddButton}>
                <Grid
                  container
                  xs={12}
                  md={12}
                  sm={12}
                  display="flex"
                  flexDirection="row"
                >
                  <Stack
                    spacing={2}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <TextField
                      name="username"
                      variant="outlined"
                      label="Location"
                      value={value.username}
                      onChange={handleChange}
                      fullWidth
                    />
  
                    <Button variant="contained" type="submit">
                      <Typography
                        color="secondary"
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: "0px",
                        }}
                      >
                        Submit
                      </Typography>
                    </Button>
                  </Stack>
                </Grid>
              </form>
            </Typography>
          </Dialog>
  
          <Dialog
            onClose={handleCloseDialog}
            open={openDialog}
            fullWidth
            sx={{
              height: "70vh",
              width: "100%",
            }}
          >
            <Typography
              variant="div"
              component={DialogContent}
              sx={{
                height: "70vh",
                width: "100%",
              }}
            >
              <form onSubmit={handleUpdate}>
                <Grid
                  container
                  xs={12}
                  md={12}
                  sm={12}
                  display="flex"
                  flexDirection="row"
                >
                  <Stack
                    spacing={2}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <span key={editValue.id}></span>
  
                    <TextField
                      name="username"
                      variant="outlined"
                      label="Location"
                      value={editValue.username}
                      onChange={handleEditChange}
                      fullWidth
                    />
  
                    <Button type="submit" variant="contained">
                      <Typography
                        color="secondary"
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        Update
                      </Typography>
                    </Button>
                  </Stack>
                </Grid>
              </form>
            </Typography>
          </Dialog>
        </Grid>
      </>
    );
  }
  
  export default Location;
  