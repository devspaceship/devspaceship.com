use leptos::prelude::*;
use leptos_meta::{provide_meta_context, MetaTags, Stylesheet, Title};
use leptos_router::{
    components::{Route, Router, Routes},
    StaticSegment,
};

use crate::layout::{Footer, ProfilePicture, SiteLayout};

pub fn shell(options: LeptosOptions) -> impl IntoView {
    view! {
        <!DOCTYPE html>
        <html lang="en" class="dark">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <AutoReload options/>
                // Static routes do not need HydrationScripts; add an islands bootstrap
                // when interactive components are introduced.
                <MetaTags/>
            </head>
            <body class="min-h-screen font-sans antialiased">
                <App/>
            </body>
        </html>
    }
}

#[component]
pub fn App() -> impl IntoView {
    provide_meta_context();

    view! {
        <Stylesheet id="leptos" href="/pkg/site.css"/>
        <Title text="Thomas Saint-Gérand"/>
        <Router>
            <SiteLayout>
                <Routes fallback=|| "Not found.">
                    <Route path=StaticSegment("") view=HomePage/>
                </Routes>
            </SiteLayout>
        </Router>
    }
}

#[component]
fn HomePage() -> impl IntoView {
    view! {
        <div class="mt-12">
            <ProfilePicture/>
        </div>
        <div class="space-y-4 px-3 text-center">
            <h1 class="text-4xl font-bold">"devspaceship.com"</h1>
            <p class="text-lg text-neutral-500">"Rust edition — under construction 🦀"</p>
        </div>
        <Footer/>
    }
}
