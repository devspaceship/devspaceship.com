use leptos::prelude::*;
use leptos_meta::{Meta, Title};

#[component]
pub fn BeatapticPage() -> impl IntoView {
    view! {
        <Title text="Beataptic - Thomas Saint-Gérand"/>
        <Meta name="description" content="Beataptic - An Apple Watch metronome app combining haptic feedback with optional audio."/>
        <div class="w-full max-w-3xl space-y-8 px-4 py-12">
            <h1 class="text-4xl font-bold">"Beataptic"</h1>
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold">"About"</h2>
                <p>
                    "Beataptic is a metronome for Apple Watch that combines haptic feedback with optional audio. Perfect for musicians, dancers, and anyone who needs rhythm guidance."
                </p>
            </section>
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold">"Features"</h2>
                <ul class="list-inside list-disc space-y-2">
                    <li>"Haptic and audio feedback (use either or both)"</li>
                    <li>"30-208 BPM tempo range"</li>
                    <li>"1-8 beats per measure"</li>
                    <li>"Adjustable volume"</li>
                    <li>"Settings automatically saved"</li>
                </ul>
            </section>
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold">"Contact"</h2>
                <p>"For support or feedback, please contact:"</p>
                <p class="text-primary">
                    <a href="mailto:thomas@devspaceship.com" class="hover:underline focus-visible:underline">
                        "thomas@devspaceship.com"
                    </a>
                </p>
            </section>
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold">"Privacy"</h2>
                <p>
                    "Beataptic does not collect or transmit any data. Everything works locally on your device."
                </p>
            </section>
        </div>
    }
}
