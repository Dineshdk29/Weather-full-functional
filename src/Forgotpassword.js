import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";

function ForgotPassword() {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email", "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
        .required("Required"),
    }),
    onSubmit: () => {
      console.log(formik.values);
      handleClick();
    },
  });
  return (
    <Grid
      container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "auto",
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: "linear-gradient(to bottom right,#a6a5fa,#e6e6f5)",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid
          item
          sx={{
            marginTop: {
              md: "10%",
            },
            padding: {
              xs: "5%",
            },
          }}
        >
          <Typography
            variant="h5"
            component="p"
            color="black"
            sx={{
              fontFamily: "Poppins",
            }}
          >
            Forgot your password?
          </Typography>
          <Typography variant="caption" color="black" component="p" mt={2}>
            Enter EmailAddress linked to your account and We will sent reset
            link to your mail.
          </Typography>

          <TextField
            variant="outlined"
            label="EmailAddress"
            required
            color="secondary"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            focused
            sx={{
              marginTop: "6%",
            }}
          />
          {formik.errors.email ? (
            <p
              style={{
                margin: 0,
                color: "red",
                padding: 0,
              }}
            >
              {formik.errors.email}
            </p>
          ) : null}

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              marginTop: "8%",
            }}
            onClick={handleClick({
              vertical: "top",
              horizontal: "right",
            })}
          >
            <Typography
              color="black"
              sx={{
                textTransform: "capitalize",
              }}
            >
              submit
            </Typography>
          </Button>
        </Grid>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Reset link send successfully
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default ForgotPassword;
