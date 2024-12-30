import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const NavbarLogin = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor= "#880e4f"
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="white">
          FitZtyle
        </Typography>
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} color="white">
          Your Fitness Journal
        </Typography>
      </Box>
    </Box>
  );
};

export default NavbarLogin;
