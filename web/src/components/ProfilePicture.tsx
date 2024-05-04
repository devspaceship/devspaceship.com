"use client";

import Image from "next/image";
import ppic from "public/static/ppic.jpg";

// const ProfilePicture = () => (
//   <Image
//     src={ppic}
//     alt="The author"
//     className="w-[250px] rounded-full border-8 border-primary-300 sm:w-[300px] md:w-[350px]"
//     priority
//     sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, 350px"
//     placeholder="blur"
//   />
// );

import Avatar from "@mui/material/Avatar";
import { Box, useTheme } from "@mui/material";

export default function ImageAvatar() {
  const theme = useTheme();
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
          borderColor: theme.palette.primary.main,
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
}

// export default ProfilePicture;
