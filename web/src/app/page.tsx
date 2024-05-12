import ProfilePicture from "@/components/ProfilePicture";
import SocialLinks from "@/components/SocialLinks";
import Title from "@/components/Title";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <ProfilePicture />
      <Title>Thomas Saint-Gérand</Title>
      <Box component="div" sx={{ textAlign: "center" }}>
        <p>
          This website is intented to be a repository of stuff that I find cool,
          interesting, visually pleasing or all of these. <br />I try to answer
          specific questions with detailed examples.
        </p>
        <footer>
          <SocialLinks />
        </footer>
      </Box>
    </>
  );
};

export default Home;
