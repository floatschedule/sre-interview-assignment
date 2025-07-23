# Float SRE Team - Interview Assignment

Welcome to the Float SRE Team - Interview Assignment! 

## Problem Statement

Our developers have built this application and now they want to get:

- The tests running in Github Actions
- The image being built automatically

They need some support from the SRE team.

## Task Description

Can you get build a CI pipeline for the application which the devs can then re-use for other applications.

## Requirements

- The application should run tests before building.
- If the tests failt the application shouldn't build a new release image.
- If the tests pass the application should build a new release image.

## Evaluation Criteria

Your solution will be evaluated based on the following criteria:

- **Accuracy and completeness:** Ensure the modified species endpoint includes the enhanced version of planet entity data in the response.
- **Security Best Practices:** Ensure that the endpoints are properly authorized, and follow general security best practices. Use your best judgement to determine what the boundaries should be.
- **Scalability and Robustness:** Design your solution to be scalable and robust, considering factors like performance, error handling, and scalability.
- **Maintainability of Code:** Write clean, modular, and maintainable code with appropriate documentation and comments.
- **Unit and/or Integration Tests:** Include tests that cover the critical path of your solution.
- **Git Commit Best Practices:** Contribute to the repository using Git commit best practices, making logical and granular commits.

## Out of Scope

The following items are considered out of scope for this test:

- 

## Getting Started

To start the server, you can leverage Docker Compose. Follow the steps below:

1. Ensure you have Docker and Docker Compose installed on your machine.
2. Clone this repository to your local machine.
3. Open a terminal and navigate to the cloned repository's root directory.
4. Run the following command to start the server:

   ```bash
   npm i
   docker compose up
   ```

## Submission
When you have completed the assignment, please submit your solution by creating a pull request to this repository and send the link to [Ashley](mailto:ashley.mondesir@float.com) via email. Include any necessary instructions or documentation for running and testing your solution.

Feel free to reach out if you have any questions or need any clarifications. Good luck!
