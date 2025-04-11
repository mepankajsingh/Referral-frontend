import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, useLoaderData, Form, useSearchParams } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "bg-white shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-4 flex justify-between items-center", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-2xl font-bold text-indigo-600 flex items-center", children: [
      /* @__PURE__ */ jsx("span", { className: "mr-2", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0115 2a1 1 0 01.707 1.707L15 4.414l.707.707A1 1 0 0115 7a1 1 0 01-.707-.293L13.586 6l-.707.707A1 1 0 0112 7a1 1 0 01-.707-1.707l.707-.707-.707-.707A1 1 0 0112 2z", clipRule: "evenodd" }) }) }),
      "ReferBonus"
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex space-x-6", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-gray-600 hover:text-indigo-600 font-medium", children: "Home" }),
      /* @__PURE__ */ jsx(Link, { to: "/categories", className: "text-gray-600 hover:text-indigo-600 font-medium", children: "Categories" }),
      /* @__PURE__ */ jsx(Link, { to: "/featured", className: "text-gray-600 hover:text-indigo-600 font-medium", children: "Featured" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx("button", { className: "text-gray-600 hover:text-indigo-600", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }) })
  ] }) });
}
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-50 border-t border-gray-200 mt-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-4", children: "ReferBonus" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Find and share referral codes for your favorite apps and services." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Quick Links" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-gray-600 hover:text-indigo-600", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/categories", className: "text-gray-600 hover:text-indigo-600", children: "Categories" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/featured", className: "text-gray-600 hover:text-indigo-600", children: "Featured Offers" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Categories" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/category/food-delivery", className: "text-gray-600 hover:text-indigo-600", children: "Food Delivery" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/category/ride-sharing", className: "text-gray-600 hover:text-indigo-600", children: "Ride Sharing" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/category/finance", className: "text-gray-600 hover:text-indigo-600", children: "Finance" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Legal" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "text-gray-600 hover:text-indigo-600", children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/terms", className: "text-gray-600 hover:text-indigo-600", children: "Terms of Service" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-sm", children: [
        "© ",
        currentYear,
        " ReferBonus. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 mt-4 md:mt-0", children: [
        /* @__PURE__ */ jsxs("a", { href: "#", className: "text-gray-600 hover:text-indigo-600", children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Twitter" }),
          /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" }) })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "text-gray-600 hover:text-indigo-600", children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "GitHub" }),
          /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", clipRule: "evenodd" }) })
        ] })
      ] })
    ] })
  ] }) });
}
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
const meta$6 = () => {
  return [
    { title: "ReferBonus - Find & Share Referral Codes" },
    { name: "description", content: "Get discounts and rewards by using referral codes for your favorite apps and services" },
    { property: "og:title", content: "ReferBonus - Find & Share& Share Referral Codes" },
    { property: "og:description", content: "Get discounts and rewards by using referral codes for your favorite apps and services" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" }
  ];
};
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "min-h-screen flex flex-col bg-gray-50", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-grow", children }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
      /* @__PURE__ */ jsxs("head", { children: [
        /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
        /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
        /* @__PURE__ */ jsx(Meta, {}),
        /* @__PURE__ */ jsx(Links, {}),
        /* @__PURE__ */ jsx("title", { children: `${error.status} ${error.statusText}` })
      ] }),
      /* @__PURE__ */ jsxs("body", { className: "min-h-screen flex flex-col bg-gray-50", children: [
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsx("main", { className: "flex-grow container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold text-gray-800 mb-4", children: [
            error.status,
            " ",
            error.statusText
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-8", children: error.data }),
          /* @__PURE__ */ jsx("a", { href: "/", className: "inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg", children: "Go back home" })
        ] }) }),
        /* @__PURE__ */ jsx(Footer, {}),
        /* @__PURE__ */ jsx(ScrollRestoration, {}),
        /* @__PURE__ */ jsx(Scripts, {})
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx("title", { children: "Error" })
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "min-h-screen flex flex-col bg-gray-50", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-grow container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Something went wrong" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-8", children: "We're sorry, an unexpected error has occurred." }),
        /* @__PURE__ */ jsx("a", { href: "/", className: "inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg", children: "Go back home" })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: App,
  links,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const supabaseUrl = process.env.SUPABASE_URL || "https://tgzkmcsoekyuhqavrhno.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnemttY3NvZWt5dWhxYXZyaG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTk0NzIsImV4cCI6MjA1OTg3NTQ3Mn0.nz4ueg3g_w-uDg8ttB_y2Ch67QNu6Z-hs9yPDosArz8";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}
function generateSeoMeta({
  title,
  description
}) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" }
  ];
}
function isBrowser() {
  return typeof window !== "undefined";
}
async function copyToClipboard(text) {
  if (!isBrowser()) return false;
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}
function ReferralCard({ referral, featured = false }) {
  const [copied, setCopied] = useState(false);
  const handleCopyCode = async () => {
    const success = await copyToClipboard(referral.code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: `bg-white rounded-lg shadow-md overflow-hidden border ${featured ? "border-indigo-200" : "border-gray-200"}`, children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: referral.app_logo,
          alt: `${referral.app_name} logo`,
          className: "w-12 h-12 rounded-full object-cover mr-4"
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: referral.app_name }),
        referral.reward && /* @__PURE__ */ jsx("p", { className: "text-sm text-indigo-600 font-medium", children: referral.reward })
      ] }),
      featured && /* @__PURE__ */ jsx("span", { className: "ml-auto bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "Featured" })
    ] }),
    referral.description && /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4 line-clamp-2", children: referral.description }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-gray-50 rounded p-2 mb-4", children: [
      /* @__PURE__ */ jsx("code", { className: "text-sm font-mono text-gray-800", children: referral.code }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleCopyCode,
          className: "text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center",
          children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
            "Copied!"
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) }),
            "Copy Code"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: `/referral/${referral.slug}`,
          className: "text-sm text-indigo-600 hover:text-indigo-800 font-medium",
          children: "View Details"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 flex items-center", children: [
        /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
        ] }),
        referral.views,
        " views"
      ] })
    ] })
  ] }) });
}
const meta$5 = ({ data }) => {
  if (!data || !data.category) {
    return generateSeoMeta({
      title: "Category Not Found - ReferBonus",
      description: "The category you're looking for could not be found."
    });
  }
  return generateSeoMeta({
    title: `${data.category.name} Referral Codes - ReferBonus`,
    description: `Find and share referral codes for ${data.category.name} apps and services. Get discounts and rewards.`
  });
};
const loader$5 = async ({ params }) => {
  const { slug } = params;
  if (!slug) {
    throw new Response("Category slug is required", { status: 400 });
  }
  const { data: categoryData, error: categoryError } = await supabase.from("categories").select("*").eq("slug", slug).single();
  if (categoryError && categoryError.code !== "PGRST116") {
    console.error("Error fetching category:", categoryError);
  }
  if (!categoryData) {
    throw new Response("Category not found", { status: 404 });
  }
  const { data: referrals, error: referralsError } = await supabase.from("referrals").select("*").eq("category_id", categoryData.id).order("views", { ascending: false });
  if (referralsError) {
    console.error("Error fetching referrals:", referralsError);
  }
  return json({
    category: categoryData,
    referrals: referrals || []
  });
};
function CategoryPage() {
  const { category, referrals } = useLoaderData();
  if (!category) {
    return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-4", children: "Category Not Found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "The category you're looking for could not be found." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-indigo-100 p-4 rounded-full mr-5", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: category.icon_link,
          alt: category.name,
          className: "w-12 h-12"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-2", children: category.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
          referrals.length,
          " referral",
          referrals.length !== 1 ? "s" : "",
          " available"
        ] })
      ] })
    ] }),
    referrals.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: referrals.map((referral) => /* @__PURE__ */ jsx(ReferralCard, { referral }, referral.id)) }) : /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-2", children: "No referrals found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "There are no referral codes available for this category yet." })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CategoryPage,
  loader: loader$5,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const meta$4 = ({ data }) => {
  if (!data || !data.referral) {
    return generateSeoMeta({
      title: "Referral Not Found - ReferBonus",
      description: "The referral code you're looking for could not be found."
    });
  }
  return generateSeoMeta({
    title: `${data.referral.app_name} Referral Code - ReferBonus`,
    description: data.referral.description || `Get rewards with this ${data.referral.app_name} referral code. ${data.referral.reward || ""}`
  });
};
const loader$4 = async ({ params }) => {
  const { slug } = params;
  if (!slug) {
    throw new Response("Referral slug is required", { status: 400 });
  }
  const { data: referral, error: referralError } = await supabase.from("referrals").select("*").eq("slug", slug).single();
  if (referralError && referralError.code !== "PGRST116") {
    console.error("Error fetching referral:", referralError);
  }
  if (!referral) {
    throw new Response("Referral not found", { status: 404 });
  }
  await supabase.from("referrals").update({ views: (referral.views || 0) + 1 }).eq("id", referral.id);
  const { data: category, error: categoryError } = await supabase.from("categories").select("*").eq("id", referral.category_id).single();
  if (categoryError) {
    console.error("Error fetching category:", categoryError);
  }
  const { data: relatedReferrals, error: relatedError } = await supabase.from("referrals").select("*").eq("category_id", referral.category_id).neq("id", referral.id).limit(3);
  if (relatedError) {
    console.error("Error fetching related referrals:", relatedError);
  }
  return json({
    referral,
    category,
    relatedReferrals: relatedReferrals || []
  });
};
function ReferralPage() {
  const { referral, category, relatedReferrals } = useLoaderData();
  const [copied, setCopied] = useState(false);
  if (!referral) {
    return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-4", children: "Referral Not Found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "The referral code you're looking for could not be found." })
    ] });
  }
  const handleCopyCode = async () => {
    const success = await copyToClipboard(referral.code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: category && /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/category/${category.slug}`,
        className: "text-indigo-600 hover:text-indigo-800 flex items-center mb-4",
        children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-1", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
          "Back to ",
          category.name
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-6", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: referral.app_logo,
            alt: `${referral.app_name} logo`,
            className: "w-16 h-16 rounded-full object-cover mr-5"
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800", children: referral.app_name }),
          referral.reward && /* @__PURE__ */ jsx("p", { className: "text-indigo-600 font-medium", children: referral.reward })
        ] }),
        referral.is_featured && /* @__PURE__ */ jsx("span", { className: "ml-auto bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full", children: "Featured" })
      ] }),
      referral.description && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-2", children: "Description" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: referral.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-2", children: "Referral Code" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-gray-50 rounded p-4", children: [
          /* @__PURE__ */ jsx("code", { className: "text-lg font-mono text-gray-800", children: referral.code }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleCopyCode,
              className: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded flex items-center",
              children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
                "Copied!"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) }),
                "Copy Code"
              ] })
            }
          )
        ] })
      ] }),
      referral.app_url && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-2", children: "How to Use" }),
        /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside text-gray-600 space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: "Copy the referral code above" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Visit the",
            " ",
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: referral.app_url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-indigo-600 hover:text-indigo-800 underline",
                children: [
                  referral.app_name,
                  " website"
                ]
              }
            ),
            " ",
            "or open the app"
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Enter the code during signup or in the promotions section" }),
          /* @__PURE__ */ jsx("li", { children: "Enjoy your rewards!" })
        ] })
      ] }),
      referral.terms && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-2", children: "Terms & Conditions" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: referral.terms })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
          ] }),
          referral.views,
          " views"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          "Added on ",
          formatDate(referral.created_at)
        ] })
      ] })
    ] }) }),
    relatedReferrals.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Related Referrals" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: relatedReferrals.map((related) => /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: related.app_logo,
              alt: `${related.app_name} logo`,
              className: "w-12 h-12 rounded-full object-cover mr-4"
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: related.app_name }),
            related.reward && /* @__PURE__ */ jsx("p", { className: "text-sm text-indigo-600 font-medium", children: related.reward })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: `/referral/${related.slug}`,
            className: "block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded text-center",
            children: "View Referral"
          }
        )
      ] }) }, related.id)) })
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ReferralPage,
  loader: loader$4,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function CategoryCard({ category, count }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: `/category/${category.slug}`,
      className: "bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200",
      children: /* @__PURE__ */ jsxs("div", { className: "p-6 flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-indigo-100 p-3 rounded-full mr-4", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: category.icon_link,
            alt: category.name,
            className: "w-8 h-8"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: category.name }),
          count !== void 0 && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
            count,
            " referral",
            count !== 1 ? "s" : ""
          ] })
        ] })
      ] })
    }
  );
}
const meta$3 = () => {
  return generateSeoMeta({
    title: "All Categories - ReferBonus",
    description: "Browse all categories of referral codes and find the perfect discount for your needs."
  });
};
const loader$3 = async () => {
  const { data: categories, error: categoriesError } = await supabase.from("categories").select("*").order("name");
  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError);
  }
  const { data: countData, error: countError } = await supabase.from("referrals").select("category_id, count").group("category_id");
  if (countError) {
    console.error("Error fetching category counts:", countError);
  }
  const categoryCounts = {};
  countData == null ? void 0 : countData.forEach((item) => {
    categoryCounts[item.category_id] = item.count;
  });
  return json({
    categories: categories || [],
    categoryCounts
  });
};
function CategoriesPage() {
  const { categories, categoryCounts } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-4", children: "All Categories" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Browse all categories of referral codes and find the perfect discount for your needs." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: categories.map((category) => /* @__PURE__ */ jsx(
      CategoryCard,
      {
        category,
        count: categoryCounts[category.id] || 0
      },
      category.id
    )) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CategoriesPage,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return generateSeoMeta({
    title: "Featured Referral Codes - ReferBonus",
    description: "Discover our hand-picked selection of the best referral codes with the highest rewards and benefits."
  });
};
const loader$2 = async () => {
  const { data: referrals, error } = await supabase.from("referrals").select("*").eq("is_featured", true).order("views", { ascending: false });
  if (error) {
    console.error("Error fetching featured referrals:", error);
  }
  return json({
    referrals: referrals || []
  });
};
function FeaturedPage() {
  const { referrals } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-4", children: "Featured Referral Codes" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Discover our hand-picked selection of the best referral codes with the highest rewards and benefits." })
    ] }),
    referrals.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: referrals.map((referral) => /* @__PURE__ */ jsx(ReferralCard, { referral, featured: true }, referral.id)) }) : /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-2", children: "No featured referrals found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Check back soon for featured referral codes." })
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FeaturedPage,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function SearchBar() {
  const [query, setQuery] = useState("");
  return /* @__PURE__ */ jsx(Form, { method: "get", action: "/search", className: "w-full max-w-2xl", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" }) }) }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "search",
        name: "q",
        value: query,
        onChange: (e) => setQuery(e.target.value),
        className: "block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500",
        placeholder: "Search for apps or referral codes...",
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "text-white absolute right-2.5 bottom-2.5 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2",
        children: "Search"
      }
    )
  ] }) });
}
function Hero() {
  return /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: "Find & Share Referral Codes" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl mb-8 max-w-3xl mx-auto", children: "Get discounts and rewards by using referral codes for your favorite apps and services" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(SearchBar, {}) })
  ] }) });
}
function FeaturedSection({ referrals }) {
  return /* @__PURE__ */ jsxs("section", { className: "py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Featured Referrals" }),
      /* @__PURE__ */ jsxs(Link, { to: "/featured", className: "text-indigo-600 hover:text-indigo-800 font-medium flex items-center", children: [
        "View All",
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 ml-1", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: referrals.map((referral) => /* @__PURE__ */ jsx(ReferralCard, { referral, featured: true }, referral.id)) })
  ] });
}
function CategoriesSection({ categories, counts }) {
  return /* @__PURE__ */ jsxs("section", { className: "py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Browse Categories" }),
      /* @__PURE__ */ jsxs(Link, { to: "/categories", className: "text-indigo-600 hover:text-indigo-800 font-medium flex items-center", children: [
        "View All",
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 ml-1", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: categories.map((category) => /* @__PURE__ */ jsx(
      CategoryCard,
      {
        category,
        count: counts ? counts[category.id] : void 0
      },
      category.id
    )) })
  ] });
}
const meta$1 = () => {
  return [
    { title: "ReferBonus - Find & Share Referral Codes" },
    { name: "description", content: "Get discounts and rewards by using referral codes for your favorite apps and services" }
  ];
};
const loader$1 = async () => {
  const { data: featuredReferrals, error: featuredError } = await supabase.from("referrals").select("*").eq("is_featured", true).order("views", { ascending: false }).limit(3);
  if (featuredError) {
    console.error("Error fetching featured referrals:", featuredError);
  }
  const { data: recentReferrals, error: recentError } = await supabase.from("referrals").select("*").order("created_at", { ascending: false }).limit(6);
  if (recentError) {
    console.error("Error fetching recent referrals:", recentError);
  }
  const { data: popularReferrals, error: popularError } = await supabase.from("referrals").select("*").order("views", { ascending: false }).limit(6);
  if (popularError) {
    console.error("Error fetching popular referrals:", popularError);
  }
  const { data: categories, error: categoriesError } = await supabase.from("categories").select("*").limit(6);
  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError);
  }
  let categoryCounts = {};
  try {
    const { data: countData, error: countError } = await supabase.from("referrals").select("category_id, count").group("category_id");
    if (countError) {
      console.error("Error fetching category counts:", countError);
    } else if (countData) {
      countData.forEach((item) => {
        if (item && typeof item.category_id === "number") {
          categoryCounts[item.category_id] = item.count || 0;
        }
      });
    }
  } catch (error) {
    console.error("Error processing category counts:", error);
  }
  return json({
    featuredReferrals: featuredReferrals || [],
    recentReferrals: recentReferrals || [],
    popularReferrals: popularReferrals || [],
    categories: categories || [],
    categoryCounts
  });
};
function Index() {
  const { featuredReferrals, recentReferrals, popularReferrals, categories, categoryCounts } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      featuredReferrals.length > 0 && /* @__PURE__ */ jsx(FeaturedSection, { referrals: featuredReferrals }),
      /* @__PURE__ */ jsx(CategoriesSection, { categories, counts: categoryCounts }),
      /* @__PURE__ */ jsxs("section", { className: "py-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Recent Referrals" }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: recentReferrals.map((referral) => /* @__PURE__ */ jsx(ReferralCard, { referral }, referral.id)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "py-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Popular Referrals" }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: popularReferrals.map((referral) => /* @__PURE__ */ jsx(ReferralCard, { referral }, referral.id)) })
      ] })
    ] })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = ({ data }) => {
  if (!data) return [];
  const { query } = data;
  return generateSeoMeta({
    title: `Search Results for "${query}" - ReferBonus`,
    description: `Find referral codes and rewards for "${query}" on ReferBonus.`
  });
};
const loader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  if (!query) {
    return json({
      referrals: [],
      query: ""
    });
  }
  const { data: referrals, error } = await supabase.from("referrals").select("*").or(`app_name.ilike.%${query}%,description.ilike.%${query}%,title.ilike.%${query}%`).order("views", { ascending: false });
  if (error) {
    console.error("Error searching referrals:", error);
  }
  return json({
    referrals: referrals || [],
    query
  });
};
function SearchPage() {
  const { referrals, query } = useLoaderData();
  const [searchParams] = useSearchParams();
  searchParams.get("q") || "";
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-6", children: "Search Results" }),
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(SearchBar, {}) }),
      query ? /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
        referrals.length,
        " result",
        referrals.length !== 1 ? "s" : "",
        ' found for "',
        query,
        '"'
      ] }) : /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Enter a search term to find referral codes." })
    ] }),
    query && referrals.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: referrals.map((referral) => /* @__PURE__ */ jsx(ReferralCard, { referral }, referral.id)) }) : query ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-2", children: "No results found" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
        `We couldn't find any referral codes matching "`,
        query,
        '". Try a different search term.'
      ] })
    ] }) : null
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SearchPage,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Btx75cEP.js", "imports": ["/assets/components-Yg-U5Nv2.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-B6ndKTdE.js", "imports": ["/assets/components-Yg-U5Nv2.js"], "css": ["/assets/root-BgAdbZro.css"] }, "routes/category.$slug": { "id": "routes/category.$slug", "parentId": "root", "path": "category/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/category._slug-DeJ5OjPT.js", "imports": ["/assets/components-Yg-U5Nv2.js", "/assets/ReferralCard-zHbCfCxh.js", "/assets/helpers-CzwXorHE.js"], "css": [] }, "routes/referral.$slug": { "id": "routes/referral.$slug", "parentId": "root", "path": "referral/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/referral._slug-BwDuqwgr.js", "imports": ["/assets/components-Yg-U5Nv2.js", "/assets/helpers-CzwXorHE.js"], "css": [] }, "routes/categories": { "id": "routes/categories", "parentId": "root", "path": "categories", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/categories-vj2L5jx5.js", "imports": ["/assets/components-Yg-U5Nv2.js", "/assets/CategoryCard-CLE71H_M.js", "/assets/helpers-CzwXorHE.js"], "css": [] }, "routes/featured": { "id": "routes/featured", "parentId": "root", "path": "featured", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/featured-ngZqoA8t.js", "imports": ["/assets/components-Yg-U5Nv2.js", "/assets/ReferralCard-zHbCfCxh.js", "/assets/helpers-CzwXorHE.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-xo9vzZrK.js", "imports": ["/assets/components-Yg-U5Nv2.js", "/assets/SearchBar-BCrfWlgn.js", "/assets/ReferralCard-zHbCfCxh.js", "/assets/CategoryCard-CLE71H_M.js", "/assets/helpers-CzwXorHE.js"], "css": [] }, "routes/search": { "id": "routes/search", "parentId": "root", "path": "search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search-DfBllXxi.js", "imports": ["/assets/components-Yg-U5Nv2.js", "/assets/ReferralCard-zHbCfCxh.js", "/assets/SearchBar-BCrfWlgn.js", "/assets/helpers-CzwXorHE.js"], "css": [] } }, "url": "/assets/manifest-b1857642.js", "version": "b1857642" };
const mode = "production";
const assetsBuildDirectory = "dist/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/category.$slug": {
    id: "routes/category.$slug",
    parentId: "root",
    path: "category/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/referral.$slug": {
    id: "routes/referral.$slug",
    parentId: "root",
    path: "referral/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/categories": {
    id: "routes/categories",
    parentId: "root",
    path: "categories",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/featured": {
    id: "routes/featured",
    parentId: "root",
    path: "featured",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route5
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
