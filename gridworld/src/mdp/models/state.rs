use std::hash::Hash;

pub trait State: Copy + Hash + Eq {
    fn get_all() -> Vec<Self>;
}
