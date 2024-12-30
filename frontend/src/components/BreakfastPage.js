import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BelgianWafflesImg from "../assets/Belgian-waffle.jpeg";
import chinaCheedImg from "../assets/Chia cheed.jpeg";
import PancakeImg from "../assets/Pancake.jpeg";
import oatMealImage from "../assets/Strawberry Banana Oatmeal.jpeg";
import cofeeImg from "../assets/coffee.jpeg";
import eggImage from "../assets/egg.jpeg";
import greekYourgurtImg from "../assets/greek-yourgurt.jpeg";
import { getRecipes } from "../store/actions/recipe.action";
import StartRating from "./StartRating";
import FriendListWidget from "./widgets/FriendListWidget";
import RecipesWidget from "./widgets/RecipesWidget";
import UserBreakfastRecipePostWidget from "./widgets/UserBreakfastRecipePostWidget";
import UserWidget from "./widgets/UserWidget";

const breakfastCard = [
  {
    title: "Egg and Cheese Sandwich",
    icon: <img src={eggImage} alt="breakfast" className="card--cover--2" />,
    rating: <StartRating />,
  },
  {
    title: "Strawberry Banana Oatmeal",
    icon: <img src={oatMealImage} alt="breakfast" className="card--cover--2" />,
    rating: <StartRating />,
  },
  {
    title: "Greek-Yourgurt",
    icon: (
      <img src={greekYourgurtImg} alt="breakfast" className="card--cover--2" />
    ),
    rating: <StartRating />,
  },
  {
    title: "China Cheed",
    icon: (
      <img src={chinaCheedImg} alt="breakfast" className="card--cover--2" />
    ),
    rating: <StartRating />,
  },
  {
    title: "Coffee",
    icon: <img src={cofeeImg} alt="breakfast" className="card--cover--2" />,
    rating: <StartRating />,
  },
  {
    title: "Easiest Belgian Waffles",
    icon: (
      <img src={BelgianWafflesImg} alt="breakfast" className="card--cover--2" />
    ),
    rating: <StartRating />,
  },
  {
    title: "Pancake",
    icon: <img src={PancakeImg} alt="breakfast" className="card--cover--2" />,
    rating: <StartRating />,
  },
];

const BreakfastPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const recipe = useSelector((state) => state.recipe);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  console.log("recipes", recipe);

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
          <UserBreakfastRecipePostWidget />
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

export default BreakfastPage;
