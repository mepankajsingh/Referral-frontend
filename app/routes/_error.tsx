import { useRouteError, isRouteErrorResponse, Link } from "@remix-run/react";

export default function ErrorPage() {
  const error = useRouteError();
  
  let errorMessage = "An unexpected error occurred";
  let statusCode = 500;
  
  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.data || "An error occurred";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">{statusCode}</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {statusCode === 404 ? "Page not found" : "Something went wrong"}
        </h2>
        <p className="text-gray-600 mb-8">{errorMessage}</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
