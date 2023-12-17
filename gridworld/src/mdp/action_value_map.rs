use std::collections::{hash_map, HashMap};

use super::Action;

pub struct ActionValueMap<A: Action>(HashMap<A, f64>);

impl<A: Action> ActionValueMap<A> {
    pub fn new() -> Self {
        let mut map = HashMap::new();
        for action in A::get_all() {
            map.insert(action, 0.0);
        }
        Self(map)
    }

    pub fn get(&self, action: &A) -> f64 {
        self.0.get(action).unwrap().clone()
    }

    pub fn get_mut(&mut self, action: &A) -> &mut f64 {
        self.0.get_mut(action).unwrap()
    }

    pub fn iter(&self) -> hash_map::Iter<A, f64> {
        self.0.iter()
    }
}
