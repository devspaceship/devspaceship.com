import Image from "next/image";
import ppic from "public/static/ppic.jpg";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

const ProfilePicture = () => {
  return (
    <Box
      component="div"
      sx={{
        width: 250,
        height: 250,
        borderRadius: "50%",
        margin: "auto",
        marginTop: 5,
      }}
    >
      <Avatar
        sx={{
          width: 250,
          height: 250,
          border: "7px solid",
          borderColor: "primary.main",
        }}
      >
        <Image
          src={ppic}
          alt="The author"
          priority
          layout="fill"
          objectFit="cover"
          className="avatarImage"
          placeholder="blur"
        />
      </Avatar>
    </Box>
  );
};

export default ProfilePicture;
