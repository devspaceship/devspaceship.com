use super::{Action, State};

pub struct Environment<S, A>
where
    S: State,
    A: Action,
{
    pub states: Vec<S>,
    pub actions: Vec<A>,
    pub transition: fn(&S, &A) -> (S, f64),
}

impl<S, A> Environment<S, A>
where
    S: State,
    A: Action,
{
    pub fn new(states: Vec<S>, actions: Vec<A>, transition: fn(&S, &A) -> (S, f64)) -> Self {
        Self {
            states,
            actions,
            transition,
        }
    }
}
