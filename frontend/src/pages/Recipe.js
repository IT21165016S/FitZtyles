import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import breakfastImage from "../assets/breakfast-modified.png";
import dinnerImage from "../assets/dinner-modified.png";
import healthyImage from "../assets/healthy-dinks-modified.png";
import lunchImage from "../assets/lunch-modified.png";
import FriendListWidget from "../components/widgets/FriendListWidget";
import UserWidget from "../components/widgets/UserWidget";

const Card = [
  {
    title: <button className="card--title-1">Breakfast</button>,
    icon: (
      <img src={breakfastImage} alt="breakfast" className="card--cover-1" />
    ),
    path: "/breakfast",
  },
  {
    title: <button className="card--title-1">Lunch</button>,
    icon: <img src={lunchImage} alt="breakfast" className="card--cover-1" />,
    path: "/lunch",
  },
  {
    title: <button className="card--title-1">Dinner</button>,
    icon: <img src={dinnerImage} alt="breakfast" className="card--cover-1" />,
    path: "/dinner",
  },
  {
    title: <button className="card--title-1">Fresh Fruits & Healthy Drinks</button>,
    icon: (
      <img src={healthyImage} alt="breakfast" className="card--cover-1" />
    ),
    path: "/freshfruitsandhealthydrinks",
  },
];

const Recipe = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
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
          <br></br>
          <div className="background-container-1">
            <div className="card--container-1">
              {Card.map((item) => (
                <div className="card-1">
                  <div className="card--cover-1">{item.icon}</div>
                  <div className="card--title-1">
                    <Link to={item.path} className="card--button-1">
                      {item.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default Recipe;
