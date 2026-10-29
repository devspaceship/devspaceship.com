//! Static route views. These pages render entirely on the server.

mod beataptic;
mod home;
mod not_found;
mod posts;

pub use beataptic::BeatapticPage;
pub use home::HomePage;
pub use not_found::NotFoundPage;
pub use posts::PostsPage;
