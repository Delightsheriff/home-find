import Link from "next/link";

export default function NotFoud() {
  return (
    <>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto h-12 w-12 text-primary" />

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Oops, Property not found!
          </h1>
          <p className="mt-4 text-muted-foreground">
            The property you&apos;re looking for doesn&apos;t seem to exist.
            Please check the URL or try navigating back to the listing page.
          </p>
          <div className="mt-6">
            <Link
              href="/property"
              className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              prefetch={false}
            >
              Go to Listing page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
