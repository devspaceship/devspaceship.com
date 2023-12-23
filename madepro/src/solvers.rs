use crate::{
    config::Config,
    models::{Policy, StateValue, MDP},
    utils::{infer_policy, policy_evaluation},
};

fn policy_value_iteration<M>(mdp: &M, config: &Config) -> Policy<M::State, M::Action>
where
    M: MDP,
{
    let mut state_value = StateValue::new();
    let mut policy = Policy::new();
    loop {
        let new_state_value = policy_evaluation(mdp, config, &policy, Some(state_value));
        let new_policy = infer_policy(mdp, config, &new_state_value);
        if new_policy == policy {
            break;
        }
        state_value = new_state_value;
        policy = new_policy;
    }
    policy
}

pub fn policy_iteration<M>(mdp: &M, config: &Config) -> Policy<M::State, M::Action>
where
    M: MDP,
{
    assert!(
        config.iterations_before_improvement.is_none(),
        "Iterations before improvement must be None for policy iteration"
    );
    policy_value_iteration(mdp, config)
}

pub fn value_iteration<M>(mdp: &M, config: &Config) -> Policy<M::State, M::Action>
where
    M: MDP,
{
    assert!(
        config.iterations_before_improvement.is_some_and(|n| n > 0),
        "Iterations before improvement must be Some(u32) and > 0 for value iteration"
    );
    policy_value_iteration(mdp, config)
}
