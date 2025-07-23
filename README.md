# Float SRE Team - Interview Assignment

Welcome to the Float SRE Team - Interview Assignment! 

## Problem Statement

The Float development team have built this application and now they want to get:

- The tests running in Github Actions.
- The image being built when a branch is merged to master.

They need some support from the SRE team.

## Task Description

Can you build a CI pipeline for the application which the devs can then re-use for other applications.

## Basic Requirements

- The application should run tests before building.
- If the tests fail the application shouldn't build a new release image.
- If the tests pass the application should build a new release image, but only if this is a merge to the master branch.
- Tests should run against all branches.

## Evaluation Criteria

Your solution will be evaluated based on the following criteria:

- **Usability:** Adding PR comments for failing tests, considering integrating notification events or other useability actions that could support our development teams in making them more efficient.
- **Security Best Practices:** Follow general security best practices. Use your best judgement to determine what the boundaries should be, don't store confidential information publicly accessible.
- **Scalability and Robustness:** Design your solution to be scalable and robust, considering factors like performance, error handling, and scalability.
- **Maintainability of Code:** Write clean, modular, and maintainable configuration with appropriate documentation and comments.
- **Git Commit Best Practices:** Contribute to the repository using Git commit best practices, making logical and granular commits.

## Out of Scope

The following items are considered out of scope for this test:

- Don't worry about deployments.

## Submission

When you have completed the assignment, please submit your solution by ????? Include any necessary instructions or documentation for running and testing your solution.

Feel free to reach out if you have any questions or need any clarifications. Good luck!
