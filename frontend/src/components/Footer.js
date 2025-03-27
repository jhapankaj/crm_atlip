import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#274472", // Themed blue
        color: "#fff",
        padding: "10px 0",
        textAlign: "center",
        width: "100%",
        marginTop: "auto", // Push footer to the bottom
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;