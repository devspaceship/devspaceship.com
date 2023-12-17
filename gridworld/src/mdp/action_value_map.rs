use std::collections::{hash_map, HashMap};

use super::ActionTrait;

pub struct ActionValueMap<Action: ActionTrait>(HashMap<Action, f64>);

impl<Action: ActionTrait> ActionValueMap<Action> {
    pub fn new() -> Self {
        let mut map = HashMap::new();
        for action in Action::get_all() {
            map.insert(action, 0.0);
        }
        Self(map)
    }

    pub fn get(&self, action: &Action) -> f64 {
        self.0.get(action).unwrap().clone()
    }

    pub fn get_mut(&mut self, action: &Action) -> &mut f64 {
        self.0.get_mut(action).unwrap()
    }

    pub fn iter(&self) -> hash_map::Iter<Action, f64> {
        self.0.iter()
    }
}
