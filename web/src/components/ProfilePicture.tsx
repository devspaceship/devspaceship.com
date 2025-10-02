import Image from "next/image";
import ppic from "public/static/ppic.jpg";

const ProfilePicture = () => (
	<Image
		src={ppic}
		alt="The author"
		className="w-[250px] rounded-full border-8 border-primary sm:w-[300px] md:w-[320px]"
		priority
		sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, 350px"
		placeholder="blur"
	/>
);

export default ProfilePicture;
