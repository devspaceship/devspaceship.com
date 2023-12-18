use std::hash::Hash;

use crate::utils::StateValue;

/// # MDP
///
/// Your MDP should implement this trait.\
/// Afterwards you can use the solvers on your MDP.
pub trait MDP {
    type State: Eq + Hash;
    type StateIntoIter: IntoIterator<Item = Self::State>;
    type Action;
    type ActionIntoIter: IntoIterator<Item = Self::Action>;

    /// Returns an iterator over all states.
    fn get_states(&self) -> Self::StateIntoIter;

    /// Returns an iterator over all actions.
    fn get_actions(&self) -> Self::ActionIntoIter;

    /// Determines whether a state is terminal.
    fn is_state_terminal(&self, state: &Self::State) -> bool;

    /// Given a state and an action, returns the next state and reward.
    fn transition(&self, state: &Self::State, action: &Self::Action) -> (&Self::State, f64);

    /// Returns a new state value
    fn get_state_value(&self) -> StateValue<Self::State> {
        let mut state_value = StateValue::new();
        for x in self.get_states() {
            state_value.insert(x, 0.0);
        }
        state_value
    }
}
