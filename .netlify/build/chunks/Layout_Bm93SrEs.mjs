import { e as createComponent, m as maybeRenderHead, j as renderScript, r as renderTemplate, f as createAstro, h as addAttribute, k as renderHead, i as renderComponent, l as renderSlot } from './astro/server_Ct226vxg.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="bg-white shadow-sm"> <div class="container mx-auto px-4 py-3 max-w-5xl"> <div class="flex justify-between items-center"> <div> <a href="/" class="text-xl font-bold text-primary-700">ReferralHub</a> </div> <nav class="hidden md:flex space-x-6"> <a href="/" class="text-sm font-medium text-gray-700 hover:text-primary-600">Home</a> <a href="/referrals" class="text-sm font-medium text-gray-700 hover:text-primary-600">Referrals</a> <a href="/categories" class="text-sm font-medium text-gray-700 hover:text-primary-600">Categories</a> <a href="/about" class="text-sm font-medium text-gray-700 hover:text-primary-600">About</a> </nav> <div class="md:hidden"> <button id="mobile-menu-button" class="text-gray-500 hover:text-gray-700 focus:outline-none"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> <div id="mobile-menu" class="md:hidden hidden pt-2 pb-1"> <a href="/" class="block py-2 text-sm font-medium text-gray-700 hover:text-primary-600">Home</a> <a href="/referrals" class="block py-2 text-sm font-medium text-gray-700 hover:text-primary-600">Referrals</a> <a href="/categories" class="block py-2 text-sm font-medium text-gray-700 hover:text-primary-600">Categories</a> <a href="/about" class="block py-2 text-sm font-medium text-gray-700 hover:text-primary-600">About</a> </div> </div> </header> ${renderScript($$result, "/home/project/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/project/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-white border-t border-gray-200 mt-10"> <div class="container mx-auto px-4 py-6 max-w-5xl"> <div class="flex flex-col md:flex-row justify-between items-center"> <div class="mb-4 md:mb-0"> <a href="/" class="text-lg font-bold text-primary-700">ReferralHub</a> <p class="text-sm text-gray-500 mt-1">Find and share referral codes</p> </div> <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"> <a href="/about" class="text-gray-600 hover:text-primary-600">About</a> <a href="/contact" class="text-gray-600 hover:text-primary-600">Contact</a> <a href="/privacy" class="text-gray-600 hover:text-primary-600">Privacy Policy</a> <a href="/terms" class="text-gray-600 hover:text-primary-600">Terms of Service</a> </div> </div> <div class="mt-6 text-center text-xs text-gray-500">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ReferralHub. All rights reserved.
</div> </div> </footer>`;
}, "/home/project/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Find and share referral codes for your favorite apps and services" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="min-h-screen flex flex-col bg-gray-50 text-gray-900"> ${renderComponent($$result, "Header", $$Header, {})} <main class="flex-grow container mx-auto px-3 py-4 max-w-5xl"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/project/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
