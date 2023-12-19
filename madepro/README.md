# madepro

A Rust library for solving finite deterministic Markov Decision Processes (MDPs).

## Roadmap

- [ ] Tests
- [ ] Policy evaluation
- [ ] Policy improvement
- [ ] Policy iteration
- [ ] Value iteration
- [ ] SARSA
- [ ] Q-learning
- [ ] Clippy
- [ ] Maybe refactor Config to derive builder pattern
- [ ] Release vec constraints into dynamic IntoIterator constraints
- [ ] Clone less data
- [ ] Research applicability of CoW and BTrees
- [ ] Documentation
- [ ] Implement traits on structs (Display, Iterator, etc.)

## Future

- [ ] State-dependent action spaces
- [ ] Stochastic policies
- [ ] Stochastic next states

## Improvements

Currently, the environment does the transition and determines if a state is terminal.
For doing this it holds a context outside of the states and actions.
Ideally we could transition from just having the states and actions.
This would require doing the search in the states instead of using an external context.
For this we would probably need to use a BTreeMap for efficent lookup of the next state.
