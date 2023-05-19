import Image from "next/image";
import ppic from "public/static/ppic.jpg";

export default function ProfilePicture() {
  return (
    <Image
      src={ppic}
      alt="The author"
      className="w-[250px] rounded-full border-8 border-primary-300 sm:w-[300px] md:w-[350px]"
      priority
      sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, 350px"
      placeholder="blur"
    />
  );
}
