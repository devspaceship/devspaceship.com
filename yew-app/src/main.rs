use crate::components::social_link::SocialLink;
use yew::prelude::*;

mod components;

#[function_component]
fn App() -> Html {
    let counter = use_state(|| 0);
    let onclick = {
        let counter = counter.clone();
        move |_| {
            let value = *counter + 1;
            counter.set(value);
        }
    };

    html! {
        <div class={classes!("bg-background-900", "text-white", "antialiased")}>
            <div>
                <SocialLink href="https://github.com/devspaceship" aria_label="Github">
                    <i class="fa-brands fa-github"></i>
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/in/devspaceship/" aria_label="LinkedIn">
                    <i class="fa-brands fa-linkedin"></i>
                </SocialLink>
                <SocialLink href="https://www.instagram.com/devspaceship/" aria_label="Instagram">
                    <i class="fa-brands fa-instagram"></i>
                </SocialLink>
                <SocialLink href="https://twitter.com/devspaceship" aria_label="Twitter">
                    <i class="fa-brands fa-twitter"></i>
                </SocialLink>
            </div>
        </div>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
