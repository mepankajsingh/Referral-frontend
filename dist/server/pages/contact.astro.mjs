/* empty css                                 */
import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CrNoV3M9.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DCOM5V2o.mjs';
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact Us - ReferralHub" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl mx-auto"> <h1 class="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1> <div class="bg-white rounded-lg shadow-md p-8"> <p class="text-lg text-gray-700 mb-6">
Have questions, suggestions, or feedback? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
</p> <form class="space-y-6"> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label> <input type="text" id="name" name="name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required> </div> <div> <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" id="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required> </div> </div> <div> <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label> <input type="text" id="subject" name="subject" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required> </div> <div> <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label> <textarea id="message" name="message" rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required></textarea> </div> <div> <button type="submit" class="w-full md:w-auto px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors">
Send Message
</button> </div> </form> <div class="mt-8 pt-8 border-t border-gray-200"> <h2 class="text-xl font-semibold text-gray-900 mb-4">Other Ways to Reach Us</h2> <div class="space-y-4"> <div class="flex items-start"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> <div> <p class="text-sm font-medium text-gray-700">Email</p> <a href="mailto:contact@referralhub.com" class="text-primary-600 hover:underline">contact@referralhub.com</a> </div> </div> <div class="flex items-start"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <div> <p class="text-sm font-medium text-gray-700">Support</p> <p class="text-gray-600">We typically respond within 24-48 hours.</p> </div> </div> </div> </div> </div> </div> ` })}`;
}, "/home/project/src/pages/contact.astro", void 0);

const $$file = "/home/project/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
