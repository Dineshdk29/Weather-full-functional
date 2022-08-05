import { Grid } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Grid container>
      <Grid
        xs={12}
        md={12}
        alignContent="center"
        alignItems="center"
        sx={{
          paddingLeft: "0%",
        }}
      >
        <img
          src="https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Error-Page.gif"
          height="580"
          width="1250"
          alt="not found"
        />
      </Grid>
    </Grid>
  );
};
export default NotFound;
