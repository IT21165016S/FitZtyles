import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BeefStewImg from "../assets/Beef-Stew.jpeg";
import LemonImage from "../assets/Lemon-dinner.jpeg";
import RatatouilleImg from "../assets/Ratatouille.jpeg";
import StartRating from "./StartRating";
import { getRecipes } from "../store/actions/recipe.action";
import FriendListWidget from "./widgets/FriendListWidget";
import RecipesWidget from "./widgets/RecipesWidget";
import UserDinnerRecipePostWidget from "./widgets/UserDinnerRecipePostWidget";
import UserWidget from "./widgets/UserWidget";


const DinnerCard = [
  {
    title: "Lemon and Dill Butter Garlic Chicken and Asparagus",
    icon: <img src={LemonImage} alt="dinner" className="card--cover--2" />,
    rating: <StartRating />,
  },
  {
    title: "Easy Homemade Beef Stew",
    icon: <img src={BeefStewImg} alt="dinner" className="card--cover--2" />,
    rating: <StartRating />,
  },
  {
    title: "Ratatouille",
    icon: <img src={RatatouilleImg} alt="dinner" className="card--cover--2" />,
    rating: <StartRating />,
  },
];

const DinnerPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const recipe = useSelector((state) => state.recipe);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  console.log("recipes", recipe);


  // const togglePopup = (index) => {
  //   setShowPopup(!showPopup);
  //   selectedItem(DinnerCard[index]);
  // };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    
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
          <UserDinnerRecipePostWidget />
          <RecipesWidget category="Breakfast" />
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


export default DinnerPage;
