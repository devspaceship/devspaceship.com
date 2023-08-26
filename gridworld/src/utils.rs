use crate::types::{Cell, CellType, Matrix, PolicyDirection};

/// Takes n, m and value and returns a matrix of n rows and m columns filled with value
pub fn matrix<T: Clone>(n: usize, m: usize, value: T) -> Matrix<T> {
    vec![vec![value; m]; n]
}

/// Returns the next state and reward given the current state and action
pub fn transition(
    grid: &Matrix<Cell>,
    i: usize,
    j: usize,
    action: PolicyDirection,
) -> (usize, usize, i32) {
    let cell = &grid[i][j];
    let (i, j) = (i as i32, j as i32);
    let (i_, j_) = match action {
        PolicyDirection::Up => (i - 1, j),
        PolicyDirection::Down => (i + 1, j),
        PolicyDirection::Left => (i, j - 1),
        PolicyDirection::Right => (i, j + 1),
    };
    let (i, j) = (i as usize, j as usize);
    let grid_len = grid.len().try_into().unwrap();
    if i_ < 0 || i_ >= grid_len || j_ < 0 || j_ >= grid_len {
        return (i, j, -1);
    }
    let (i_, j_) = (i_ as usize, j_ as usize);
    let cell_ = &grid[i_][j_];
    match cell.cell_type {
        CellType::End => (i, j, 0),
        CellType::Wall => (i, j, -1),
        CellType::Air => match cell_.cell_type {
            CellType::End => (i_, j_, 100),
            CellType::Wall => (i, j, -1),
            CellType::Air => (i_, j_, -1),
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_matrix() {
        let mut m = matrix(2, 3, 0);
        m[0][0] = 1;
        assert_eq!(m, vec![vec![1, 0, 0], vec![0, 0, 0]]);
    }

    fn get_test_grid() -> Matrix<Cell> {
        vec![
            vec![Cell::new(CellType::Air), Cell::new(CellType::Air)],
            vec![Cell::new(CellType::Wall), Cell::new(CellType::End)],
        ]
    }

    #[test]
    fn test_transition_to_boundaries() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 0, PolicyDirection::Left), (0, 0, -1));
        assert_eq!(transition(&grid, 0, 0, PolicyDirection::Up), (0, 0, -1));
        assert_eq!(transition(&grid, 0, 1, PolicyDirection::Right), (0, 1, -1));
    }

    #[test]
    fn test_transition_to_air() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 0, PolicyDirection::Right), (0, 1, -1));
    }

    #[test]
    fn test_transition_to_wall() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 0, PolicyDirection::Down), (0, 0, -1));
    }

    #[test]
    fn test_transition_to_end() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 0, 1, PolicyDirection::Down), (1, 1, 100));
    }

    #[test]
    fn test_transition_to_end_from_end() {
        let grid = get_test_grid();
        assert_eq!(transition(&grid, 1, 1, PolicyDirection::Up), (1, 1, 0));
    }
}
