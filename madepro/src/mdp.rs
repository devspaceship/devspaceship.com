use crate::utils::DynamicIntoIter;

/// # MDP
///
/// Your MDP should implement this trait.\
/// Afterwards you can use the solvers on your MDP.
pub trait MDP {
    type State;
    type Action;

    /// Returns an iterator over all states.
    fn get_states(&self) -> DynamicIntoIter<&Self::State>;

    /// Returns an iterator over all actions.
    fn get_actions(&self) -> DynamicIntoIter<&Self::Action>;

    /// Determines whether a state is terminal.
    fn is_state_terminal(&self, state: &Self::State) -> bool;

    /// Given a state and an action, returns the next state and reward.
    fn transition(&self, state: &Self::State, action: &Self::Action) -> (&Self::State, f64);
}
