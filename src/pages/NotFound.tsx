import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">404 Error</p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mx-auto mb-8 max-w-xl text-base text-muted-foreground sm:text-lg">
          The page you’re looking for doesn’t exist, may have moved, or the link may be outdated.
        </p>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Home
          </Link>
          <Link
            to="/courses/cpl"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Contact
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          If you believe this is a broken link, please contact us and we’ll help you find the right page.
        </p>
      </div>
    </div>
  );
};

export default NotFound;

