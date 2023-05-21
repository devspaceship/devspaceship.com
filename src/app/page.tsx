import ProfilePicture from "@/components/ProfilePicture";
import SocialLinks from "@/components/SocialLinks";
import Title from "@/components/Title";

export default function Home() {
  return (
    <>
      <div className="mt-12">
        <ProfilePicture />
      </div>
      <Title size={2}>Thomas Saint-Gérand</Title>
      <p className="px-3">
        This website is intented to be a repository of stuff that I find cool,
        interesting, visually pleasing or all of these. I try to answer specific
        questions with detailed examples.
      </p>
      <footer className="flex w-full justify-center space-x-6 pb-12">
        <SocialLinks />
      </footer>
    </>
  );
}
