use std::collections::hash_map;
use std::collections::HashMap;

use super::Action;
use super::State;

pub type StateValue<S> = HashMap<S, f64>;

pub struct StateActionValue<A: Action>(HashMap<A, f64>);

impl<A: Action> StateActionValue<A> {
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

pub struct ActionValue<S: State, A: Action>(HashMap<S, StateActionValue<A>>);

impl<S: State, A: Action> ActionValue<S, A> {
    pub fn new() -> Self {
        let mut map = HashMap::new();
        for state in S::get_all() {
            map.insert(state, StateActionValue::new());
        }
        Self(map)
    }

    pub fn get(&self, state: &S, action: &A) -> f64 {
        self.0.get(state).unwrap().get(action)
    }

    pub fn get_mut(&mut self, state: &S, action: &A) -> &mut f64 {
        self.0.get_mut(state).unwrap().get_mut(action)
    }

    pub fn iter(&self) -> hash_map::Iter<S, StateActionValue<A>> {
        self.0.iter()
    }
}
