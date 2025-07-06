# ProperRent - Property Listing Platform

**ProperRent** is a modern, user-friendly property listing platform built with Next.js. It allows users to find properties for rent, and enables landlords to list and manage their properties. The platform currently focuses on the Nigerian market.

## Features

*   **User Registration & Roles:** Users can sign up as either "Tenants" or "Landlords."
*   **Property Search & Filtering:**
    *   Search for rental properties.
    *   Filter properties by type (Residential, Commercial, Industrial), price range, and location (Nigerian states).
    *   View detailed property information and image galleries.
*   **Landlord Dashboard:**
    *   Create new property listings with detailed information, amenities, and images.
    *   Upload ownership documents.
    *   View and manage their listed properties.
*   **Authentication:** Secure credentials-based authentication using NextAuth.js.
*   **Responsive Design:** User interface built with Shadcn UI and Tailwind CSS for a seamless experience across devices.
*   **Coming Soon:** Features for leasing and buying properties are planned for future releases.

## Tech Stack

*   **Frontend:** [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI & Tailwind CSS)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **State Management:** React Context API, Client-side state with `useState`, `useEffect`
*   **Forms:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) (for validation)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Credentials Provider)
*   **API Communication:** `fetch` API

## Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

3.  **Set up Environment Variables:**
    This project requires certain environment variables to function correctly. Create a `.env.local` file in the root of your project by copying the example file:
    ```bash
    cp .env.example .env.local
    ```
    Now, open `.env.local` and fill in the required values:

    *   `NEXT_PUBLIC_API_URL`: The base URL of your backend API. This application expects a backend service to manage data for properties, users, and authentication.
        *   Example: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
    *   `NEXTAUTH_SECRET`: A strong, random string used by NextAuth.js to encrypt session cookies and tokens. You can generate one using `openssl rand -base64 32`.
        *   Example: `NEXTAUTH_SECRET=your_super_secret_nextauth_key_here`
    *   `NEXTAUTH_URL`: The canonical URL of your Next.js application. For local development, this is typically `http://localhost:3000`.
        *   Example: `NEXTAUTH_URL=http://localhost:3000`

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    # or
    # pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server (after building).
*   `npm run lint`: Lints the codebase using Next.js's ESLint configuration.

## Backend API

This frontend application relies on an external backend API for all data operations, including user authentication, property listings, and management. Ensure the backend API is running and that the `NEXT_PUBLIC_API_URL` environment variable in your `.env.local` file points to its correct address.

The backend is expected to provide endpoints such as:
*   `/auth/login`, `/auth/register`, `/auth/logout`, `/auth/refresh-token`
*   `/property/all-properties`, `/property/get-property/:id`, `/property/my-property`, `/property/post-property`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. Remember to configure your environment variables in your Vercel project settings.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
