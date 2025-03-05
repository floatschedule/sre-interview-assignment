# Float Services Team - Interview Assignment

Welcome to the Float Services Team - Interview Assignment! 

## Problem Statement

We are building a Star Wars API wrapper that integrates with the [Star Wars API (SWAPI)](https://swapi.dev) to provide structured data on various entities within the Star Wars universe.

Currently, when retrieving species data from the SWAPI, separate API calls must be made to fetch both the species information and their associated homeworld (planet) data. This results in unnecessary API requests and potential performance overhead.

To improve efficiency and reduce API call volume, we want to modify our SWAPI wrapper so that the species endpoint includes the associated planet data in a single API response. This will optimize retrieval and improve performance.

Additionally, we need to introduce a destruction flag on the planet entity, which indicates whether a planet has been destroyed. This flag is not provided by the SWAPI, so our wrapper must support setting and persisting this value in our own database. The destruction flag should always be included in the planet entity's response.

## Task Description

Your task is to modify our SWAPI wrapper by implementing a species endpoint that includes associated planet data in a single API response, reducing the need for separate API calls. Additionally, you will introduce a destruction flag (`destroyed: true/false`) on planets, which must be persisted in a database and always included in the planet entity's response.

You will be working with a boilerplate that **does not yet contain any existing endpoints**, so you will need to define and implement the necessary API routes. While CI/CD setup or deployment configurations are out of scope, you can assume the API will run in a Kubernetes cluster. 

## Requirements

- The modified species endpoint should return the species details, including the name, classification, language, and any other relevant fields as per the SWAPI specification.
- Allow for the sorting of species by `average_height` via the API by means of a query parameter.
- The API response should also include the associated planet data for each species. This should include the planet name, population, climate, terrain, and any other relevant information available from the SWAPI. Don't forget our new destruction flag we've added!
- A new API endpoint to allow the persistence of a planet's state of destruction.
- The persistence layer for storing this flag is up to you to choose and can be either SQL or NoSQL. Include this as a service in the existing Docker network.

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

- Exposing any other data apart from species or planet data.
- Implementing user based permissions or scopes.
- The addition of pagination.
- Setting up CI/CD pipelines or deployment configuration.
- Achieving 100% test coverage.

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
