import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomFlex from "../CustomFlex";
import UserImage from "../UserImage";
import WidgetWrapper from "../WidgetWrapper";

const UserWidget = ({ user }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [isCurrentUser, setIsCurrentUser] = useState("");

  const currentUser = useSelector((state) => state.user);

  // const user = useSelector((state) => state.user);

  return (
    <WidgetWrapper>
      <CustomFlex
        gap="0.5rem"
        pb="1.1rem"
        onClick={() =>
          currentUser.user.id === user.id
            ? navigate("/profile/update")
            : navigate(`/profile/${user.id}`)
        }
      >
        <CustomFlex gap="1rem">
          <UserImage image={user?.profileImage} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.dark,
                  cursor: "pointer",
                },
              }}
            >
              {user?.firstName} {user?.lastName}
            </Typography>
            {/* <Typography color={medium}>{friends.length} friends</Typography> */}
          </Box>
        </CustomFlex>
        {currentUser.user.id === user?.id ? <ManageAccountsOutlined /> : <></>}
      </CustomFlex>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Galle</Typography>
        </Box>
        {user?.bio && (
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{user.bio}</Typography>
          </Box>
        )}
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <CustomFlex gap="1rem" mb="0.5rem">
          <CustomFlex gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>
                {user?.twitterHandle || "Social Network"}
              </Typography>
            </Box>
          </CustomFlex>
          <EditOutlined sx={{ color: main }} />
        </CustomFlex>

        <CustomFlex gap="1rem">
          <CustomFlex gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>
                {user?.bio || "Network Platform"}
              </Typography>
            </Box>
          </CustomFlex>
          <EditOutlined sx={{ color: main }} />
        </CustomFlex>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
