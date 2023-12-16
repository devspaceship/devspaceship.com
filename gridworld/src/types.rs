#[derive(Debug, PartialEq)]
pub enum Cell {
    Air,
    Wall,
    End,
}

pub type Grid<T> = Vec<Vec<T>>;
