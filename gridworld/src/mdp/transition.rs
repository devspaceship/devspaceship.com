pub type Transition<S, A> = fn(&S, &A) -> (S, f64);
