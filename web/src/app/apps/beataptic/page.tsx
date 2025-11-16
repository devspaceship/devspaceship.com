import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Beataptic - Thomas Saint-Gérand",
	description:
		"Beataptic - An Apple Watch metronome app combining haptic feedback with optional audio.",
};

const BeatapticSupport = async () => {
	"use cache";
	return (
		<div className="w-full max-w-3xl space-y-8 px-4 py-12">
			<h1 className="text-4xl font-bold">Beataptic</h1>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">About</h2>
				<p>
					Beataptic is a metronome for Apple Watch that combines haptic feedback
					with optional audio. Perfect for musicians, dancers, and anyone who
					needs rhythm guidance.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Features</h2>
				<ul className="list-inside list-disc space-y-2">
					<li>Haptic and audio feedback (use either or both)</li>
					<li>30-208 BPM tempo range</li>
					<li>1-8 beats per measure</li>
					<li>Adjustable volume</li>
					<li>Settings automatically saved</li>
				</ul>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Contact</h2>
				<p>For support or feedback, please contact:</p>
				<p className="text-primary">
					<a href="mailto:thomas@devspaceship.com" className="hover:underline">
						thomas@devspaceship.com
					</a>
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Privacy</h2>
				<p>
					Beataptic does not collect or transmit any data. Everything works
					locally on your device.
				</p>
			</section>
		</div>
	);
};

export default BeatapticSupport;
