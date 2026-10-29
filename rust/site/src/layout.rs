//! Shared, static site chrome. These components render entirely on the server.

use leptos::prelude::*;

/// The page-independent layout; route views own their content and optional footer.
#[component]
pub fn SiteLayout(children: Children) -> impl IntoView {
    view! {
        <NavBar/>
        <main class="container mx-auto flex h-full flex-col items-center justify-start space-y-12 motion-safe:animate-fade-in-from-bottom">
            {children()}
        </main>
    }
}

#[component]
pub fn NavBar() -> impl IntoView {
    view! {
        <nav aria-label="Main navigation" class="py-6 motion-safe:animate-fade-in-from-top">
            <div class="container mx-auto flex justify-evenly">
                <a href="/" class="shell-link" aria-label="Home">
                    <Icon icon=icondata::FaHouseSolid/>
                </a>
                <a href="/posts" class="shell-link" aria-label="Posts">
                    <Icon icon=icondata::FaFileLinesSolid/>
                </a>
            </div>
        </nav>
    }
}

#[component]
pub fn SocialLinks() -> impl IntoView {
    view! {
        <SocialLink href="https://github.com/devspaceship" label="Github" icon=icondata::FaGithubBrands/>
        <SocialLink href="https://www.linkedin.com/in/devspaceship/" label="LinkedIn" icon=icondata::FaLinkedinBrands/>
        <SocialLink href="mailto:thomas@devspaceship.com" label="Email" icon=icondata::FaEnvelopeSolid/>
    }
}

#[component]
fn SocialLink(href: &'static str, label: &'static str, icon: icondata::Icon) -> impl IntoView {
    view! {
        <a href=href target="_blank" rel="noopener noreferrer" class="shell-link" aria-label=label>
            <Icon icon/>
        </a>
    }
}

#[component]
pub fn ProfilePicture() -> impl IntoView {
    view! {
        <img
            src="/static/ppic.jpg"
            alt="The author"
            width="720"
            height="720"
            fetchpriority="high"
            class="h-auto w-[250px] rounded-full border-8 border-primary sm:w-[300px] md:w-[320px]"
        />
    }
}

/// Opt-in, matching the homepage footer rather than adding one to every route.
#[component]
pub fn Footer() -> impl IntoView {
    view! {
        <footer class="flex w-full justify-center space-x-6 pb-12">
            <SocialLinks/>
        </footer>
    }
}

#[component]
fn Icon(icon: icondata::Icon) -> impl IntoView {
    view! {
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="shell-icon"
            width=icon.width
            height=icon.height
            viewBox=icon.view_box
            fill=icon.fill.unwrap_or("currentColor")
            stroke=icon.stroke
            stroke-width=icon.stroke_width
            stroke-linecap=icon.stroke_linecap
            stroke-linejoin=icon.stroke_linejoin
            aria-hidden="true"
            focusable="false"
            // Only trusted, compile-time SVG markup from icondata is inserted here.
            inner_html=icon.data
        />
    }
}
