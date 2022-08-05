import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Stack, TextField, ThemeProvider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


function Weather() {
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

  const navigate = useNavigate();
  let click = () => {
    navigate("/Location");   
  };

  const things = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(
        `${"https://api.openweathermap.org/data/2.5/"}weather?q=${query}&units=metric&APPID=${"31899736ed6679356039b21ebf825f4f"}`
      )
        .then((response) => response.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (<Grid
        style={{
          backgroundImage: "linear-gradient(to bottom right,#a6a5fa,#e6e6f5)",
          width:'100vw',
          height:'110vh',
          position:'fixed',
          marginLeft:'-16.8%',
          marginTop:'-1%'
          }}
       >
    <ThemeProvider theme={theme}>
      
        <center>
          <Box >
            <AppBar
              position="sticky"
              color="appbar"
              elevation={0}
              
              sx={{
                backdropFilter: "blur(50px)",
                width:'100%'
              }}
            >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  disabled
                ></IconButton>
                <Typography
                  variant="h6"
                  component="div"
                 
                ></Typography>
               
                  <Button color="primary" onClick={handleLogout} variant='contained' disableElevation >Signout</Button>
                   &nbsp;
                  <Button color="primary" onClick={click} variant='contained'  disableElevation >Location</Button>
         
              </Toolbar>
            </AppBar>
          </Box>
          <Grid
            mt={4}
            className={
              typeof weather.main == "undefined" ? "app" : weather.main.temp
            }
          >
            <Stack
              alignItems="center"
              spacing={2}
              sx={{
                width: "80%",
                
              }}
            >
              <TextField
                label="Your city name"
                type="text"
                variant="outlined"
                color="secondary"
                placeholder="Enter here "
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
                sx={{
                  width: "100%",
                }}
              />

              {  typeof weather.main == "null" ? <p style={{
                color:'red',
                marginTop:'5%',
                padding:'0%'
              }}>
                Please enter a value
              </p>       :  typeof weather.main == "undefined" ? <p style={{
                color:'red',
                marginTop:'5%',
                padding:'0%'
              }}>
                 Please Enter a valid Location
              </p>
                
               : (
                <Grid container xs={12} md={12} sm={12}>
                  <Grid container direction="column" m={2}>
                    <Grid m={2}>
                      {weather.name}, {weather.sys.country}
                    </Grid>
                    <Grid>{dateBuilder(new Date())}</Grid>
                  </Grid>

                  <Grid container direction="column">
                    <Grid >{Math.round(weather.main.temp)}°C</Grid>
                    <Grid m={2}>{weather.weather[0].main}</Grid>
                  </Grid>
                </Grid>
              )}
            </Stack>
          </Grid>
        </center>
       </ThemeProvider>
         </Grid>
 
  );
}
export default Weather;
