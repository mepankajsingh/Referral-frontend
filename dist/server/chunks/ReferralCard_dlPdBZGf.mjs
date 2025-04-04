import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_CrNoV3M9.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$ReferralCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ReferralCard;
  const { id, appName, code, description, url, userBenefit, referrerBenefit } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white rounded-md shadow overflow-hidden hover:shadow-md transition-shadow"> <div class="p-4"> <div class="flex justify-between items-start"> <h3 class="text-lg font-semibold text-gray-900">${appName}</h3> </div> ${description && renderTemplate`<p class="mt-1 text-sm text-gray-600 line-clamp-2">${description}</p>`} <div class="mt-3 space-y-2"> <div> <div class="text-xs font-medium text-gray-500">Referral Code</div> <div class="mt-1 flex"> <div class="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono text-sm flex-grow"> ${code} </div> <button class="ml-2 px-2 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 copy-button"${addAttribute(code, "data-code")} onclick="navigator.clipboard.writeText(this.dataset.code); this.textContent='Copied!'; setTimeout(() => this.textContent='Copy', 2000);">
Copy
</button> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-3"> ${userBenefit && renderTemplate`<div> <div class="text-xs font-medium text-gray-500">You Get</div> <div class="mt-0.5 text-sm text-gray-800">${userBenefit}</div> </div>`} ${referrerBenefit && renderTemplate`<div> <div class="text-xs font-medium text-gray-500">Referrer Gets</div> <div class="mt-0.5 text-sm text-gray-800">${referrerBenefit}</div> </div>`} </div> </div> <div class="mt-4"> <a${addAttribute(url, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
Use Referral
<svg xmlns="http://www.w3.org/2000/svg" class="ml-1.5 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path> </svg> </a> </div> </div> </div>`;
}, "/home/project/src/components/ReferralCard.astro", void 0);

export { $$ReferralCard as $ };
