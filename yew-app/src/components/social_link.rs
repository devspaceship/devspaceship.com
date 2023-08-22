use yew::{function_component, html, virtual_dom::AttrValue, Children, Html, Properties};

#[derive(Properties, PartialEq)]
pub struct SocialLinkProps {
    pub href: AttrValue,
    pub aria_label: AttrValue,
    pub children: Children,
}

#[function_component]
pub fn SocialLink(props: &SocialLinkProps) -> Html {
    html! {
        <a
            href={props.href.clone()}
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary-300"
            aria-label={props.aria_label.clone()}
        >
            {for props.children.iter()}
        </a>
    }
}
