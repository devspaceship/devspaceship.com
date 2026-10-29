use leptos::prelude::*;
use leptos_meta::Title;

struct PostSummary {
    href: &'static str,
    title: &'static str,
    summary: &'static str,
}

// Keep in sync with web/src/posts/published.ts and the MDX metadata until
// the markdown migration provides a shared post registry.
const POSTS: &[PostSummary] = &[
    PostSummary {
        href: "/posts/elevator",
        title: "What if we would make an elevator through Earth?",
        summary: "Have you ever wondered what would happen if we would make a vaccum tube and have some sort of elevator through Earth? How long would it take to go to the other side just with gravity?",
    },
    PostSummary {
        href: "/posts/bluesky",
        title: "Why is the sky blue ?",
        summary: "Have you ever wondered why the sky is blue ? Here is a very detailed explanation getting into the electromagnetism happening behind the scene.",
    },
    PostSummary {
        href: "/posts/tesseract",
        title: "Tesseract Animation Tutorial",
        summary: "Have you ever wondered how the cool rotating tesseract projections are made ? Here I explain what a tesseract is, what does it mean to do a rotation in four dimensions and how to project the tesseract in three dimensions in a stylish way.",
    },
    PostSummary {
        href: "/posts/gridworld",
        title: "Interactive Gridworld",
        summary: "An easy introduction to Markov Decision Processes and Reinforcement Learning by the mean of a gridworld environment where you can play with different parameters of solving algorithms and modify the map to see the effects. We'll see what are state-value function and policies and we look into four solvers.",
    },
];

#[component]
pub fn PostsPage() -> impl IntoView {
    view! {
        <Title text="Posts"/>
        <div>
            <div class="mt-6">
                <h1 class="text-center text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
                    "Posts"
                </h1>
            </div>
            {POSTS.iter().map(|post| view! {
                <a href=post.href aria-label=post.title class="post-link">
                    <div class="mt-4 flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm">
                        <div class="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
                            <div class="font-semibold leading-none text-primary">{post.title}</div>
                        </div>
                        <div class="px-6">
                            <p>{post.summary}</p>
                        </div>
                    </div>
                </a>
            }).collect_view()}
        </div>
    }
}
