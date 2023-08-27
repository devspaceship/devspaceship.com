use gridworld::{
    types::{Cell, Policy},
    utils::{policy_evaluation, policy_improvement},
};

fn main() {
    let grid = vec![vec![Cell::Air, Cell::Air], vec![Cell::Wall, Cell::End]];
    let policy_grid = vec![
        vec![Policy::Right, Policy::Down],
        vec![Policy::Right, Policy::Right],
    ];
    let state_value = policy_evaluation(&grid, &policy_grid, None, None);
    println!("{:?}", state_value);
    let new_policy = policy_improvement(&grid, &state_value, None);
    println!("{:?}", new_policy);
}
