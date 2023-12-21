use crate::utils::{GridworldAction, GridworldState};
use madepro::{
    config::Config,
    utils::{infer_policy, policy_evaluation},
};
use utils::{get_optimal_policy, get_test_grid, Gridworld};

mod utils;

#[test]
fn main() {
    // Policy evaluation
    let mdp = Gridworld::new(get_test_grid());
    let config = Config::new()
        .discount_factor(0.97)
        .iterations_before_improvement(None);
    let policy = get_optimal_policy();
    let state_value = policy_evaluation(&mdp, &config, &policy, None);
    assert_eq!(state_value.get(&GridworldState::new(0, 0)), 96.0);
    assert_eq!(state_value.get(&GridworldState::new(0, 1)), 100.0);
    assert_eq!(state_value.get(&GridworldState::new(1, 1)), 0.0);

    // Policy inference
    let inferred_policy = infer_policy(&mdp, &config, &state_value);
    assert_eq!(
        inferred_policy.get(&GridworldState::new(0, 0)),
        &GridworldAction::Right
    );
    assert_eq!(
        inferred_policy.get(&GridworldState::new(0, 1)),
        &GridworldAction::Down
    );
}
