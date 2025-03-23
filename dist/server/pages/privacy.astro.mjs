/* empty css                                 */
import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CrNoV3M9.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DCOM5V2o.mjs';
export { renderers } from '../renderers.mjs';

const $$Privacy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Privacy Policy - ReferralHub" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl mx-auto"> <h1 class="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1> <div class="prose prose-lg max-w-none"> <p>
Last updated: May 2023
</p> <p>
At ReferralHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
        disclose, and safeguard your information when you visit our website.
</p> <h2 class="text-2xl font-bold mt-8 mb-4">Information We Collect</h2> <p>
We may collect information about you in various ways, including:
</p> <ul class="list-disc pl-6 mt-2"> <li>Information you provide when using our services</li> <li>Automatically collected information when you visit our website</li> <li>Cookies and similar tracking technologies</li> </ul> <h2 class="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2> <p>
We may use the information we collect about you for various purposes, including:
</p> <ul class="list-disc pl-6 mt-2"> <li>To provide and maintain our services</li> <li>To improve our website and user experience</li> <li>To communicate with you</li> <li>To monitor and analyze usage patterns</li> </ul> <h2 class="text-2xl font-bold mt-8 mb-4">Disclosure of Your Information</h2> <p>
We may share information we have collected about you in certain situations, including:
</p> <ul class="list-disc pl-6 mt-2"> <li>With your consent</li> <li>To comply with legal obligations</li> <li>To protect and defend our rights and property</li> <li>With third-party service providers to facilitate our services</li> </ul> <h2 class="text-2xl font-bold mt-8 mb-4">Contact Us</h2> <p>
If you have questions or concerns about this Privacy Policy, please contact us at
<a href="mailto:privacy@referralhub.com" class="text-primary-600 hover:underline">privacy@referralhub.com</a>.
</p> </div> </div> ` })}`;
}, "/home/project/src/pages/privacy.astro", void 0);

const $$file = "/home/project/src/pages/privacy.astro";
const $$url = "/privacy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
