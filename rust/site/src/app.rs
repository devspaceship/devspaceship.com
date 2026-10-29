use leptos::prelude::*;
use leptos_meta::{provide_meta_context, MetaTags, Stylesheet, Title};
use leptos_router::{
    components::{Route, Router, Routes},
    StaticSegment,
};

use crate::layout::SiteLayout;
use crate::pages::{BeatapticPage, HomePage, NotFoundPage, PostsPage};

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
                <Routes fallback=NotFoundPage>
                    <Route path=StaticSegment("") view=HomePage/>
                    <Route path=StaticSegment("posts") view=PostsPage/>
                    <Route path=(StaticSegment("apps"), StaticSegment("beataptic")) view=BeatapticPage/>
                </Routes>
            </SiteLayout>
        </Router>
    }
}
