import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../store/slices/user.slice";
import WidgetWrapper from "../WidgetWrapper";
import Friend from "./Friend";

const MyCreatedPostsWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const navigate = useNavigate();

  const token = localStorage.getItem("Authorization");
  const friends = useSelector((state) => state.user.friends);

  return (
    <>
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{
            mb: "1.5rem",
            "&:hover": {
              color: palette.primary.dark,
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/profile/myRecipes")}
        >
          My Recipes
        </Typography>
      </WidgetWrapper>
      <Box m="2rem 0" />
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{
            mb: "1.5rem",
            "&:hover": {
              color: palette.primary.dark,
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/")}
        >
          My Workouts
        </Typography>
      </WidgetWrapper>
    </>
  );
};

export default MyCreatedPostsWidget;
