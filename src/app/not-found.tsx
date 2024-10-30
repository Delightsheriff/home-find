import React from "react";
import Link from "next/link";

/**
 * Renders the NotFound component.
 * This component is displayed when a page is not found.
 * It shows a message and a button to navigate back to the homepage.
 */
export default function NotFound() {
  return (
    <>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto h-12 w-12 text-primary" />

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Oops, page not found!
          </h1>
          <p className="mt-4 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t seem to exist. Please
            check the URL or try navigating back to the homepage.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              prefetch={false}
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
