import ProfilePicture from "@/components/ProfilePicture";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-start space-y-28 text-center">
      <div className="mt-32">
        <ProfilePicture />
      </div>
      <h1 className="text-2xl font-semibold text-primary-300 sm:text-3xl md:text-4xl lg:text-5xl">
        Thomas Saint-Gérand
      </h1>
      <p className="px-3">
        This website is intented to be a repository of stuff that I find cool,
        interesting, visually pleasing or all of these. I try to answer specific
        questions with detailed examples.
      </p>
      <footer className="flex w-full justify-center space-x-6">
        <SocialLinks />
      </footer>
    </main>
  );
}
