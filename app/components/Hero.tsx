import { Link } from "@remix-run/react";

export default function Hero() {
  return (
    <div className="bg-indigo-700">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Share & Discover Referral Codes
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-200">
            Find referral codes for your favorite services and earn rewards together.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              to="/featured"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
            >
              Browse Featured
            </Link>
            <Link
              to="/submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Submit Your Code
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
