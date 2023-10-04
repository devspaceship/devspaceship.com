use crate::{
    types::{Cell, Grid, Policy},
    utils::{matrix, policy_evaluation, policy_improvement},
};

pub fn policy_iteration(grid: Grid<Cell>, gamma: Option<f64>) -> (Grid<f64>, Grid<Policy>) {
    let n = grid.len();
    let m = grid[0].len();
    let mut is_stable = false;
    let mut state_value_grid = matrix(n, m, 0.0);
    let mut policy_grid = matrix(n, m, Policy::Up);
    while !is_stable {
        state_value_grid = policy_evaluation(&grid, &policy_grid, Some(&state_value_grid), gamma);
        is_stable = policy_improvement(&mut policy_grid, &grid, &state_value_grid, gamma);
    }
    (state_value_grid, policy_grid)
}

// fn value_iteration() {
//     unimplemented!()
// }

// fn sarsa() {
//     unimplemented!()
// }

// fn q_learning() {
//     unimplemented!()
// }

#[cfg(test)]
mod tests {
    use super::*;
    use crate::test_utils::{get_optimal_policy, get_test_grid};

    #[test]
    fn test_policy_iteration() {
        // Test policy_iteration function here
        let test_grid = get_test_grid();
        let (_state_value_grid, policy_grid) = policy_iteration(test_grid, None);
        assert!(get_optimal_policy() == policy_grid);
    }

    // #[test]
    // fn test_value_iteration() {
    //     // Test value_iteration function here
    //     assert_eq!(2 + 2, 4);
    // }

    // #[test]
    // fn test_sarsa() {
    //     // Test sarsa function here
    //     assert_eq!(2 + 2, 4);
    // }

    // #[test]
    // fn test_q_learning() {
    //     // Test q_learning function here
    //     assert_eq!(2 + 2, 4);
    // }
}
