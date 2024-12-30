import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BerryImg from "../assets/Berry.jpeg";
import HoneyImage from "../assets/Honey-Lime.jpeg";
import StrawberryImg from "../assets/Strawberry.jpeg";
import StartRating from "./StartRating";
import { getRecipes } from "../store/actions/recipe.action";
import FriendListWidget from "./widgets/FriendListWidget";
import RecipesWidget from "./widgets/RecipesWidget";
import UserHealthyDrinksResipePostWidget from "./widgets/UserHealthyDrinksResipePostWidget";
import UserWidget from "./widgets/UserWidget";

const FreshfruitsCard = [
  {
    title: "Fruit Salad with Honey-Lime",
    icon: <img src={HoneyImage} alt="dinner" className="card--cover--2" />,
    rating: <StartRating />,
  },
  {
    title: "Strawberry",
    icon: <img src={StrawberryImg} alt="dinner" className="card--cover--2" />,
    rating: <StartRating />,
  },
  {
    title: "Berry Fruit salad",
    icon: <img src={BerryImg} alt="dinner" className="card--cover--2" />,
    rating: <StartRating />,
  },
];

const FreshfruitPage = () => {
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
  //   selectedItem(FreshfruitsCard[index]);
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
          <UserHealthyDrinksResipePostWidget/>
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

export default FreshfruitPage;
