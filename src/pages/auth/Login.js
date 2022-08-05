import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloudTwoToneIcon from "@mui/icons-material/CloudTwoTone";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, selectIsLoadingFromAuth } from "../../redux/slices/auth";
import { Alert, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoadingFromAuth);
  const errorMessage = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      console.log("🚀 => values", values);

      dispatch(
        loginAction({
          usernameOremployeeId: values.email,
          password: values.password,
        })
      );

       },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/weather");
    }
 
  }, [isAuthenticated]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: "linear-gradient(to bottom right,#a6a5fa,#e6e6f5)",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "blue" }}>
              <CloudTwoToneIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...getFieldProps("password")}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        {...getFieldProps("remember")}
                        checked={values.remember}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  {isLoading && <LinearProgress />}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isLoading}
                  >
                    Sign In
                  </Button>
                </Form>
              </FormikProvider>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 2, mb: 2 }} />
        </Container>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
