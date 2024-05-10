import ProfilePicture from "@/components/ProfilePicture";
import SocialLinks from "@/components/SocialLinks";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <ProfilePicture />
      <Box component="div" sx={{ textAlign: "center" }}>
        <Box component="h1" sx={{ color: "primary.main" }}>
          Thomas Saint-Gérand
        </Box>
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
