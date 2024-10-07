# AI-Support-Chain 🤖 ⛓️

AI-Support-Chain is a tool that spots recurring issues in user queries. It uses AI to detect patterns in support requests and prioritize frequent problems, making it easier to manage and resolve common issues.

## Architecture

The project is a monorepo using Nx, a powerful toolkit for building modern web applications. The project is structured into multiple applications and libraries, making it highly scalable and maintainable.

### Key Components

* **api:** The core API application, built with NestJS, responsible for processing support requests, identifying patterns, and providing insights.
* **web:** A web application built with Angular, allowing users to interact with the AI-Support-Chain platform and view generated insights.
* **shared:** A library containing shared components and utilities used across different applications.
* **data:** A library for interacting with data storage, potentially using databases or other persistence mechanisms.

## Technologies Used

## Technologies Used

| Technology    | Icon                                                                                          | Description                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **NestJS**    | <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS Icon" width="40"/>                | A progressive Node.js framework for building efficient and scalable server-side applications.            |
| **OpenAI API**| <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="OpenAI Icon" width="40">            | Utilized for natural language processing and identifying patterns in support tickets.                    |
| **TypeScript**| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript Icon" width="40"/> | Provides strong typing and modern JavaScript features.                                                   |
| **Docker**    | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker Icon" width="40"/>   | Ensures easy deployment and consistent environments across different stages of development.              |
| **Nx**        | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nx/nx-original.svg" alt="Nx Icon" width="40"/>    | A powerful toolkit for building modern web applications, enabling code generation, testing, and more.   |
| **Next.js**   | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js Icon" width="40"/> | A React framework for building performant and SEO-friendly web applications.                             | 


## Getting Started

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/EllaFerreira/ai-support-chain.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

### Running the Application

1. Start the server:

   ```
   nx run dev-local

2. Start the client:

   ```
   nx run dev
   ```

### Running the Application with Docker

1. Start Docker containers:

   ```
   docker compose up -d
   ```

