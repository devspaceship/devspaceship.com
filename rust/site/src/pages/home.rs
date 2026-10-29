use leptos::prelude::*;

use crate::layout::{Footer, ProfilePicture};

#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <div class="mt-12">
            <ProfilePicture/>
        </div>
        <h1 class="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            "Thomas Saint-Gérand"
        </h1>
        <p class="px-3 text-center">
            "This website is intented to be a repository of stuff that I find cool, interesting, visually pleasing or all of these. I try to answer specific questions with detailed examples."
        </p>
        <Footer/>
    }
}
