import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SalmonImage from "../assets/Air-Fryer-Honey-Garlic-Salmon.jpeg";
import RamenImage from "../assets/Lunch-Saucy-Ramen-Noodles.jpeg";
import MangoBbImg from "../assets/Mango-Barbecue .jpeg";
import StartRating from "./StartRating";
import FriendListWidget from "./widgets/FriendListWidget";
import RecipesWidget from "./widgets/RecipesWidget";
import UserLunchRecipePostWidget from "./widgets/UserLunchRecipePostWidget";
import UserWidget from "./widgets/UserWidget";

const LunchCard = [
  {
    title: "Saucy Ramen Noodles",
    icon: <img src={RamenImage} alt="lunch" className="card--cover--2" />,
    rating: <StartRating />,
  },
  {
    title: "Air Fyer Honey Garlic Salmon",
    icon: <img src={SalmonImage} alt="lunch" className="card--cover--2" />,
    rating: <StartRating />,
  },
  {
    title:
      "Mango Barbecue Chicken with Mango Salsa and Rice recipe by Courtnie",
    icon: <img src={MangoBbImg} alt="lunch" className="card--cover--2" />,
    rating: <StartRating />,
  },
];

const LunchPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const recipe = useSelector((state) => state.recipe);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const togglePopup = (index) => {
    setShowPopup(!showPopup);
    selectedItem(LunchCard[index]);
  };

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user.user} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <UserLunchRecipePostWidget />
          <RecipesWidget category="Lunch" />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendListWidget userId={user.user.id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LunchPage;
