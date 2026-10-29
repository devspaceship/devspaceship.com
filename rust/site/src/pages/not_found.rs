use leptos::prelude::*;

#[component]
pub fn NotFoundPage() -> impl IntoView {
    view! {
        <h1 class="mt-6 text-5xl">"Not Found"</h1>
        <h2 class="mt-4 p-0 text-4xl">"404"</h2>
    }
}
