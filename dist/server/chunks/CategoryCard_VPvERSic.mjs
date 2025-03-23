import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_CrNoV3M9.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$CategoryCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CategoryCard;
  const { id, name, slug, description, count } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/category/${slug}`, "href")} class="block"> <div class="bg-white rounded-md shadow overflow-hidden hover:shadow-md transition-shadow h-full"> <div class="p-4"> <h3 class="text-lg font-semibold text-gray-900">${name}</h3> ${description && renderTemplate`<p class="mt-1 text-sm text-gray-600 line-clamp-2">${description}</p>`} <div class="mt-2 text-xs text-gray-500"> ${count} ${count === 1 ? "referral code" : "referral codes"} </div> </div> </div> </a>`;
}, "/home/project/src/components/CategoryCard.astro", void 0);

export { $$CategoryCard as $ };
