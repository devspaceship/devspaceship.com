#[cfg(feature = "ssr")]
#[tokio::main]
async fn main() {
    use leptos::prelude::*;

    let conf = get_configuration(None).unwrap();
    let addr = conf.leptos_options.site_addr;
    let app = router(conf.leptos_options);

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    println!("listening on http://{}", &addr);
    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}

#[cfg(feature = "ssr")]
fn router(leptos_options: leptos::prelude::LeptosOptions) -> axum::Router {
    use leptos_axum::{generate_route_list, LeptosRoutes};
    use site::app::{shell, App};

    axum::Router::new()
        .leptos_routes(&leptos_options, generate_route_list(App), {
            let leptos_options = leptos_options.clone();
            move || shell(leptos_options.clone())
        })
        .fallback(leptos_axum::file_and_error_handler(shell))
        .with_state(leptos_options)
}

#[cfg(not(feature = "ssr"))]
fn main() {
    // The client-side entry point is `hydrate` in lib.rs; this binary only exists for SSR.
}
