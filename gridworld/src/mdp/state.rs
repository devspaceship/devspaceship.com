use std::hash::Hash;

pub trait State: Sized + Hash + Eq {
    fn get_all() -> Vec<Self>;
}
