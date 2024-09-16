```markdown
# Gift Card Redesign Project

This project is a redesign of the gift card system, built using [Nuxt](https://nuxt.com), backend created on AppWrite and deployed on Vercel.

## Live Example

Check out the live example: [Gift Card Redesign](https://gift-card-redesign.vercel.app/)

## Documentation
Some of the logic implemented here should be moved to a backend where some of the data should be handled by server functions.
A backend was created to support CROD requests to better simulate a real day-to-day scenario.
This project includes some unit tests too, to demonstrate their implementation.

Documentation for the tools used in this project:
1. Nuxt 3, refer to the [Nuxt 3 documentation](https://v3.nuxtjs.org).
2. AppWrite, refer to the [AppWrite documentation](https://appwrite.io/docs).


## Setup

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/gift-card-redesign.git
    cd gift-card-redesign
    ```

2. Install the dependencies:

    ```bash
    # Using yarn
    yarn

    # Using npm
    npm install

    # Using pnpm
    pnpm install --shamefully-hoist
    ```

## Development Server

To start the development server, run:

```bash
# Using yarn
yarn dev

# Using npm
npm run dev

# Using pnpm
pnpm dev
```

The development server will start on [http://localhost:3000](http://localhost:3000).

## Building for Production

To build the project for production, run:

```bash
# Using yarn
yarn build

# Using npm
npm run build

# Using pnpm
pnpm build
```

## Deployment

The project is configured to be deployed on Vercel. You can deploy it by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/gift-card-redesign&template=nuxtjs)

## TODOS
- Improve UI to better handle errors for failed requests
- Include logic to remove a gift card
- Configure eslint, to provide project-aware, easy-to-use, extensible and future-proof integrations

```