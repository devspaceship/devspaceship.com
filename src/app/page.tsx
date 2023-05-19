import ProfilePicture from "components/ProfilePicture";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-evenly text-center">
      <ProfilePicture />
      <h1 className="text-2xl text-primary-300 sm:text-3xl md:text-4xl lg:text-5xl">
        Thomas Saint-Gérand
      </h1>
      <p className="px-3">
        This website is intented to be a repository of stuff that I find cool,
        interesting, visually pleasing or all of these. I try to answer specific
        questions with detailed examples.
      </p>
    </main>

    //  <a
    //   href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //   className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //   target="_blank"
    //   rel="noopener noreferrer"
    // >
    //   <h2 className={`mb-3 text-2xl font-semibold`}>
    //     Templates{' '}
    //     <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //       -&gt;
    //     </span>
    //   </h2>
    //   <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //     Explore the Next.js 13 playground.
    //   </p>
    // </a>
  );
}
