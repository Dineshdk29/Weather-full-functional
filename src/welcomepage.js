import {
    AppBar,
    Button,
    Grid,
    IconButton,
    ThemeProvider,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { createTheme } from "@mui/material";
  import React from "react";
  import LocationOnIcon from "@mui/icons-material/LocationOn";
  import { useNavigate } from "react-router-dom";
  // import { useDispatch,useSelector} from 'react-redux';
  
  function WelcomePage() {
    const navigate = useNavigate();
  
    const click = () => {
      navigate("/signin");
    };
  
    const onClick = () => {
      navigate("/signup");
    };
  
    //     const things = useSelector(state => state)
    //   const dispatch = useDispatch()
  
    //     const handleLogout = () => {
    //         dispatch({ type: 'USER_LOGOUT' });
    //       };
  
    const theme = createTheme({
      palette: {
        appbar: {
          main: "Transparent",
        },
        buttonColor: {
          main: "white",
        },
      },
    });
    return (
      <ThemeProvider theme={theme}>
        <Grid
          container
          md={12}
          xs={12}
          sm={12}
          style={{
            // backgroundImage: "linear-gradient(to bottom right,#5076d4, #0e338f)",
            background: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)",
            width: "100%",
            position: "fixed",
          }}
        >
          <AppBar
            position="sticky"
            color="appbar"
            elevation={0}
            sx={{
              backdropFilter: "blur(50px)",
            }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
  
              <Button
                onClick={click}
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  color: "white",
                }}
              >
                Signin
              </Button>
  
              <Button
                onClick={onClick}
                variant="contained"
                color="buttonColor"
                disableElevation
                sx={{
                  textTransform: "capitalize",
                  color: "blue",
                }}
              >
                Signup
              </Button>
            </Toolbar>
          </AppBar>
  
          <Grid
            item
            md={6}
            xs={6}
            sm={6}
            sx={{
              height: "100vh",
              padding: "10%",
            }}
          >
            <h1
              style={{
                marginBottom: "1%",
                marginTop: "1%",
                color: "white",
              }}
            >
              Hii , Have a good day
            </h1>
            <p
              style={{
                marginTop: "7%",
                color: "white",
              }}
            >
              There's no such thing as good weather or bad weather. There are just
              weather and your attitude towards it...
            </p>
            <Button
              variant="contained"
              color="buttonColor"
              onClick={click}
              sx={{
                textTransform: "capitalize",
                color: "blue",
                marginTop: "9%",
              }}
              endIcon={<LocationOnIcon htmlColor="blue" />}
            >
              Find weather in your location
            </Button>
          </Grid>
  
          <Grid item md={6} xs={6} sm={6}>
            <img
              src="https://cdna.artstation.com/p/assets/images/images/017/663/258/original/anastasia-kozheko-thundery.gif?1556866811"
              alt="userimg"
              width="85%"
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
  export default WelcomePage;
  