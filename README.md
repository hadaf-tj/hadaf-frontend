# Hadaf - Frontend

## Description
This repository contains the web interface for the Hadaf platform. Built with Next.js and React, it serves as the user-facing portal allowing interaction with the Hadaf backend systems for managing ad-hoc charitable tasks and data.

## Requirements
* Node.js 20+ (recommended)
* npm, yarn, or pnpm
* Next.js 16.1.6
* React 19

## Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hadaf-tj/hadaf-frontend
   cd hadaf-frontend
   ```

2. **Configure Environment Variables:**
   * Create a `.env.local` file in the root directory.
   * Provide necessary backend API endpoints and system flags.

3. **Install Dependencies:**
   Ensure you have your preferred package manager installed, then run:
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   # Server drops onto http://localhost:3000
   ```
   *Note: This project leverages Turbopack for local development (`next dev --turbopack`).*

## Contributing
Direct commits to the `main` branch are disabled. Please fork this repository and create a new feature branch for your work.

For a comprehensive guide covering branch management, commit standards, and Pull Request formatting, please carefully read the global [CONTRIBUTING.md](https://github.com/social-housing/.github/blob/main/profile/CONTRIBUTING.md).
