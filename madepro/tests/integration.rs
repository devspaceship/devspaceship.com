use crate::utils::GridworldState;
use madepro::{config::Config, utils::policy_evaluation};
use utils::{get_optimal_policy, get_test_grid, Gridworld};

mod utils;

#[test]
fn main() {
    let mdp = Gridworld::new(get_test_grid());
    let config = Config::new()
        .discount_factor(0.97)
        .iterations_before_improvement(None);
    let policy = get_optimal_policy();
    let state_value = policy_evaluation(&mdp, &config, &policy, None);
    assert_eq!(state_value.get(&GridworldState::new(0, 0)), 96.0);
    assert_eq!(state_value.get(&GridworldState::new(0, 1)), 100.0);
    assert_eq!(state_value.get(&GridworldState::new(1, 1)), 0.0);
}
