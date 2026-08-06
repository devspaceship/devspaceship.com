use leptos::prelude::*;
use leptos_meta::{provide_meta_context, Meta, MetaTags, Stylesheet, Title};
use leptos_router::{
    components::{Route, Router, Routes},
    StaticSegment,
};

pub fn shell(options: LeptosOptions) -> impl IntoView {
    view! {
        <!DOCTYPE html>
        <html lang="en" class="dark" style="color-scheme: dark;">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <AutoReload options=options.clone()/>
                <HydrationScripts options/>
                <MetaTags/>
            </head>
            <body>
                <App/>
            </body>
        </html>
    }
}

const SITE_TITLE: &str = "Thomas Saint-Gérand";
const SITE_DESCRIPTION: &str = "A website about science and nerdy stuff";

#[component]
pub fn App() -> impl IntoView {
    provide_meta_context();

    view! {
        <Stylesheet id="leptos" href="/pkg/site.css"/>
        <Title text=SITE_TITLE/>
        <Meta name="description" content=SITE_DESCRIPTION/>
        <Router>
            <div class="flex min-h-screen flex-col">
                <nav class="py-6 motion-safe:animate-fade-in-from-top">
                    <div class="container mx-auto flex justify-evenly">
                        <a href="/" class="hover:text-primary" aria-label="Home">
                            "Home"
                        </a>
                        <a href="/posts" class="hover:text-primary" aria-label="Posts">
                            "Posts"
                        </a>
                    </div>
                </nav>
                <main class="container mx-auto flex h-full flex-1 flex-col items-center justify-start space-y-12 motion-safe:animate-fade-in-from-bottom">
                    <Routes fallback=|| view! { <NotFoundPage/> }>
                        <Route path=StaticSegment("posts") view=PostsPage/>
                        <Route path=StaticSegment("") view=HomePage/>
                    </Routes>
                </main>
            </div>
        </Router>
    }
}

#[component]
fn HomePage() -> impl IntoView {
    view! {
        <>
            <div class="mt-12">
                <img
                    src="/static/ppic.jpg"
                    alt="The author"
                    class="w-[250px] rounded-full border-8 border-primary sm:w-[300px] md:w-[320px]"
                />
            </div>
            <h1 class="text-center text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
                {SITE_TITLE}
            </h1>
            <p class="px-3 text-center">
                "This website is intented to be a repository of stuff that I find cool, interesting, visually pleasing or all of these. I try to answer specific questions with detailed examples."
            </p>
            <footer class="flex w-full justify-center space-x-6 pb-12">
                <a
                    href="https://github.com/devspaceship"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-primary"
                    aria-label="Github"
                >
                    "Github"
                </a>
                <a
                    href="https://www.linkedin.com/in/devspaceship/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-primary"
                    aria-label="LinkedIn"
                >
                    "LinkedIn"
                </a>
                <a
                    href="mailto:thomas@devspaceship.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-primary"
                    aria-label="Email"
                >
                    "Email"
                </a>
            </footer>
        </>
    }
}

#[component]
fn PostsPage() -> impl IntoView {
    view! {
        <div class="w-full max-w-3xl px-4 pb-12 text-center">
            <h1 class="mt-6 text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
                "Posts"
            </h1>
            <p class="mt-4 text-muted-foreground">"Posts are coming soon to the Rust site."</p>
        </div>
    }
}

#[component]
fn NotFoundPage() -> impl IntoView {
    view! {
        <div class="w-full px-4 pb-12 text-center">
            <h1 class="mt-6 text-5xl">"Not Found"</h1>
            <h2 class="mt-4 p-0 text-4xl">"404"</h2>
        </div>
    }
}
