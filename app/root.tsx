import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getCategories } from "~/lib/supabase";

import "./tailwind.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap",
  },
  { rel: "icon", href: "/favicon.ico" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "ReferralHub - Share and Discover Referral Codes" },
    { name: "description", content: "Find and share referral codes for your favorite services and earn rewards together." },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { property: "og:title", content: "ReferralHub - Share and Discover Referral Codes" },
    { property: "og:description", content: "Find and share referral codes for your favorite services and earn rewards together." },
    { property: "og:type", content: "website" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const categories = await getCategories();
  return json({ categories });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { categories } = useLoaderData<typeof loader>();
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header categories={categories} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
