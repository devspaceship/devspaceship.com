import ProfilePicture from "@/components/ProfilePicture";
import SocialLinks from "@/components/SocialLinks";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <ProfilePicture />
      <Box component="div" sx={{ textAlign: "center" }}>
        <h1>Thomas Saint-Gérand</h1>
        <p>
          This website is intented to be a repository of stuff that I find cool,
          interesting, visually pleasing or all of these. <br />I try to answer
          specific questions with detailed examples.
        </p>
      </Box>
      <footer className="flex w-full justify-center space-x-6 pb-12">
        <SocialLinks />
      </footer>
    </>
  );
};

export default Home;
