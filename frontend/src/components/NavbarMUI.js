import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Menu,
  Message,
  Notifications,
  Search,
} from "@mui/icons-material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ForumIcon from "@mui/icons-material/Forum";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { pink, red } from "@mui/material/colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../store/slices/user.slice";
import CustomFlex from "./CustomFlex";

const NavbarMUI = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const primaryColor = red[500]; // Define your primary color for gradient
  const secondaryColor = pink[500]; // Define your secondary color for gradient

  const fullName = `${user.user?.firstName || "John"} ${
    user.user?.lastName || "Doe"
  }`;

  return (
    <CustomFlex padding="1rem 6%" sx={{ backgroundColor: "#880e4f" }}>
      <CustomFlex gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="white"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: "primary", // Change color on hover
              cursor: "pointer",
            },
          }}
        >
          FitZtyle
        </Typography>
        {isNonMobileScreens && (
          <CustomFlex
            backgroundColor="white" // Background color for search bar
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem "
          >
            <Search sx={{ color: primaryColor }} />
            <input
              type="text"
              placeholder="Search..."
              style={{ border: "none", outline: "none", width: "100%" }}
            />
          </CustomFlex>
        )}
      </CustomFlex>
      <Typography color="primary">
        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <CustomFlex gap="2rem">
            <ForumIcon
              fontSize="medium"
              onClick={() => navigate("/")}
              sx={{ color: "white" }} // Change icon color
            />
            <FitnessCenterIcon
              fontSize="medium"
              onClick={() => navigate("/workouts")}
              sx={{ color: "white" }} // Change icon color
            />
            <RestaurantIcon
              fontSize="medium"
              onClick={() => navigate("/recipe")}
              sx={{ color: "white" }} // Change icon color
            />
            <Message sx={{ fontSize: "25px", color: "white" }} />
            <Notifications sx={{ fontSize: "25px", color: "white" }} />
            <Help sx={{ fontSize: "25px", color: "white" }} />
            <Typography color="primary">
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    color: "white", // Change text color
                    "& .MuiSelect-icon": {
                      color: "white", // Change icon color
                    },
                  }}
                >
                  <MenuItem
                    value={fullName}
                    onClick={() => navigate(`/profile/${user.user.id}`)}
                  >
                    {fullName}
                  </MenuItem>
                  <MenuItem
                    onClick={() => dispatch(setLogout())}
                    sx={{ color: "black" }}
                  >
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </Typography>
          </CustomFlex>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu sx={{ color: "white" }} />
          </IconButton>
        )}
        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor="white"
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>
            {/* MENU ITEMS */}
            <CustomFlex
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <ForumIcon
                fontSize="medium"
                onClick={() => navigate("/")}
                sx={{ color: primaryColor }} // Change icon color
              />
              <FitnessCenterIcon
                fontSize="medium"
                onClick={() => navigate("/workouts")}
                sx={{ color: primaryColor }} // Change icon color
              />
              <RestaurantIcon
                fontSize="medium"
                onClick={() => navigate("/recipe")}
                sx={{ color: primaryColor }} // Change icon color
              />
              <Message sx={{ fontSize: "25px", color: primaryColor }} />
              <Notifications sx={{ fontSize: "25px", color: primaryColor }} />
              <Help sx={{ fontSize: "25px", color: primaryColor }} />
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{ color: primaryColor }} // Change text color
                >
                  <MenuItem
                    value={fullName}
                    onClick={() => navigate(`/profile/${user.user.id}`)}
                  >
                    {fullName}
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </CustomFlex>
          </Box>
        )}
      </Typography>
    </CustomFlex>
  );
};

export default NavbarMUI;
