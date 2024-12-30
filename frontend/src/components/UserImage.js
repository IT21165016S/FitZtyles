import { Box } from "@mui/material";

const URL = process.env.REACT_APP_FRONTEND_URL;

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        className={`rounded-full object-cover w-12 h-12 object-top`}
        alt="user"

        src={ image || "../assets/prof_pic_placeholder.png"}
      />
    </Box>
  );
};

export default UserImage;
