# Contribution Guidelines

Well, the idea is simple.

1. Make sure your code is well tested.
2. Don't overstress formatting. If it's readable, it's cool.
3. Regarding commit messages, I always prefix with an emoji
   which gives a hint about the commit. You can follow the
   same pattern if you want, but it's not mandatory.

## Bugfixes

Make sure you provide at least one bug test / regression
test which fails when reproducing your bug, and passes when
your fix is applied.

_NOTE: Terminology will be switched simply to bug tests as
soon as I get the chance to go deeper with the project. For
now the old school terminology of regressions is used, since
this was migrated from an old-school environment._

**Target directory**: `<rootDir>/test/regression/*`

## Features

Make sure you provide at least one user test which represents
the way(s) you envision your feature to be used.

_NOTE: Terminology will be switched simply to user tests as
soon as I get the chance to go deeper with the project. For
now the old school terminology of features is used, since
this was migrated from an old-school environment._

**Target directory**: `<rootDir>/test/uat/*`

+ The more unit tests, the better.

## Documentation

lol, none for now. `typedoc` sucks, and I don't have the
capacity for a fancy doc' site now.
