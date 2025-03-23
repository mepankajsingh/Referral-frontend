/* empty css                                 */
import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CrNoV3M9.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DCOM5V2o.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About ReferralHub" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl mx-auto"> <h1 class="text-3xl font-bold text-gray-900 mb-6">About ReferralHub</h1> <div class="prose prose-lg max-w-none"> <p>
ReferralHub is a platform dedicated to helping people save money and earn rewards through referral programs. 
        We believe in the power of sharing to benefit everyone involved.
</p> <h2 class="text-2xl font-bold mt-8 mb-4">Our Mission</h2> <p>
Our mission is to create a comprehensive, user-friendly platform where people can easily find and share 
        referral codes for their favorite apps and services. We aim to:
</p> <ul class="list-disc pl-6 mt-2"> <li>Help users save money on products and services they love</li> <li>Enable referrers to earn rewards for sharing their positive experiences</li> <li>Create a transparent ecosystem where everyone benefits</li> <li>Organize referral codes by categories for easy discovery</li> </ul> <h2 class="text-2xl font-bold mt-8 mb-4">How It Works</h2> <p>
ReferralHub is simple to use:
</p> <ol class="list-decimal pl-6 mt-2"> <li>Browse referral codes by category or search for specific apps</li> <li>Find a referral code that interests you</li> <li>Copy the code and click the link to use it</li> <li>Enjoy your discount, bonus, or other benefits!</li> </ol> <h2 class="text-2xl font-bold mt-8 mb-4">Contact Us</h2> <p>
Have questions, suggestions, or feedback? We'd love to hear from you! 
        Please reach out to us at <a href="mailto:contact@referralhub.com" class="text-primary-600 hover:underline">contact@referralhub.com</a>.
</p> </div> </div> ` })}`;
}, "/home/project/src/pages/about.astro", void 0);

const $$file = "/home/project/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
