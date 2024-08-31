# Regression Tests

These are tests that make a **bug report** reproducible and assure
that the given bug report is fixed for good.

## Naming Convention

The test file names should be named as follows:

```
    <bug number>-<short description>.<extension>
```

For example, the test for bug 12345 should be named as follows:

```
    12345-foo.test.ts
```

For a specific example, the test for the bug
[Hook Reevaluation due to task recreation](https://github.com/adam-rocska/useTaskQueue/issues/3) is expected to be:

```
    3-hook-reevaluation.test.ts
```

## Test Structure

Each test should be enclosed in a primary `describe` block
with the name of the the short description a.k.a. summary
of the bug.

For example, the test for bug 12345 should be enclosed in a
`describe` block as follows:

```ts
    describe('Foo causes a stack overflow during full moons:', () => {
        // test code
    });
```

Or a specific example:

```ts
    describe('Hook reevaluation due to task recreation:', () => {
        // test code
    });
```

The main describe block should only  contain `test` blocks
that describe the scenario in which the bug can be
reproduced if the bug can be reproduced in a single scenario.

The main describe block should only contain additional
describe blocks if the bug can be reproduced in multiple
scenarios.

For example, the test for bug 12345 should be enclosed in a
`describe` block as follows:

```ts
    describe('Foo causes a stack overflow during full moons:', () => {
        test('Foo causes a stack overflow during full moons.', () => {
            // test code
        });
    });
```

**When a regression test contains mocks, stubs, assets,
necessary preconditional units etc.**, they should be
organized in a directory named as follows:

```
    <bug number>-<slugified-summary>
```

The tests in the directory should still respect the
previously described rules.

For example, the test for bug 12345 should be organized as
follows:

```
    12345-foo/
        12345-foo.test.ts
        MyComponent.tsx
        someMock.ts
        someHeaders.d.ts
```
